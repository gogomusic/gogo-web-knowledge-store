<template>
  <WindowContainer
    :tools="['maxmize', 'close']"
    title="图表"
    windowName="graphWindow"
  >
    <div ref="chart" style="width: 100%; height: 85vh"></div>
  </WindowContainer>
</template>

<script lang="ts" setup>
import WindowContainer from "@/Component/WindowContainer.vue";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { computed, onMounted, ref, shallowRef } from "vue";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  GraphicComponent
} from "echarts/components";
import { useRoute } from "vue-router";
import { throttle } from "lodash";
const chart = ref();
const route = useRoute();
const myChart = shallowRef<echarts.ECharts | null>(null);
const data = ref([]);
const options = computed(() => ({
  tooltip: {
    triggerOn: "none",
    formatter: function (params: any) {
      try {
        return params.data[1].toFixed(0);
      } catch {
        return params.data.toFixed(0);
      }
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: data.value.map((item, index) => index + 1)
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      id: "chart",
      data: data.value,
      type: "line",
      lineStyle: {
        normal: {
          color: "#FAC858",
          width: 2
        }
      }
    }
  ]
}));
const init = () => {
  // 注册必须的组件
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    GraphicComponent
  ]);
  myChart.value = echarts.init(chart.value);
  myChart.value.setOption(options.value);
  myChart.value.setOption({
    graphic: echarts.util.map(data.value, function (dataItem, dataIndex) {
      return {
        type: "circle",
        shape: {
          r: 10
        },
        position: myChart.value?.convertToPixel("grid", [dataIndex, dataItem]),
        invisible: true,
        draggable: true,
        z: 100,
        ondrag: echarts.util.curry(onPointDragging, dataIndex),
        // 在 mouseover 的时候显示，在 mouseout 的时候隐藏。
        onmousemove: echarts.util.curry(showTooltip, dataIndex),
        onmouseout: echarts.util.curry(hideTooltip, dataIndex)
      };
    })
  });

  window.addEventListener("resize", function () {
    myChart.value.resize();
    resetDragCircle();
  });
};

/** 拖拽圆点的事件 */
function onPointDragging(dataIndex: number) {
  data.value[dataIndex] = myChart.value.convertFromPixel(
    "grid",
    this.position
  )[1];
  myChart.value?.setOption({
    series: [
      {
        id: "chart",
        data: data.value
      }
    ]
  });
  resetDragCircle();
  throttleUpdateGraphData();
}
const throttleUpdateGraphData = throttle(() => {
  window.opener.postMessage({
    cmd: "update graph data",
    graphData: JSON.stringify(
      data.value.map(item => parseInt(item.toFixed(0)))
    ),
    id: route.query?.id
  });
}, 300);

/** 每个拖拽圆点重新计算位置，并用 setOption 更新。 */
function resetDragCircle() {
  myChart.value?.setOption({
    graphic: echarts.util.map(data.value, function (dataItem, dataIndex) {
      return {
        position: myChart.value.convertToPixel("grid", [
          dataIndex,
          typeof dataItem === "number" ? dataItem : dataItem[1]
        ])
      };
    })
  });
}

function showTooltip(dataIndex: number) {
  myChart.value.dispatchAction({
    type: "showTip",
    seriesIndex: 0,
    dataIndex: dataIndex
  });
}

function hideTooltip(dataIndex: number) {
  myChart.value.dispatchAction({
    type: "hideTip"
  });
}

onMounted(() => {
  window.opener.postMessage({
    cmd: "get graph data",
    id: route.query?.id
  });
  window.addEventListener("message", e => {
    const { cmd, graphData, id } = e.data;
    if (cmd === "send graph data" && id === route.query.id) {
      data.value = JSON.parse(graphData).map((item: number | string) =>
        Number(item)
      );
      myChart.value?.setOption({
        series: [
          {
            id: "chart",
            data: data.value
          }
        ]
      });
      resetDragCircle();
    }
  });
  setTimeout(() => {
    init();
  }, 100);
});
</script>
<style lang="scss" scoped></style>
