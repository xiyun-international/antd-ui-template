/**
 * 如果项目为简单 layout 时，需要通过 postMessage 来向父页面发送子页面的高度，
 * 在请求列表数据后，手动调用这个方法尤其有用，因为在列表几十条数据加载到页面会很长，这时候就需要通知父页面改变高度。
 */
export default {
  updated() {
    const height = document.querySelector('.ant-layout-content>div').clientHeight;
    window.parent.postMessage(
      {
        isLoading: false,
        height: height > 400 ? height + 66 : height + 400,
      },
      '*'
    );
  },
};
