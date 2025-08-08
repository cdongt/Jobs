module.exports = async (params) => {
  // Object destructuring. We pull inputPrompt out of the QuickAdd API in params.
  const {
      quickAddApi: { inputPrompt },
      app,
  } = params;

  // 选择所有此类元素
  const elements = document.getElementsByClassName('metadata-input-longtext mod-truncate');

  // 创建一个空数组来存储每个元素的文本内容
  const texts = [];

  // 只遍历前两个元素
  for (let i = 0; i < 2 && i < elements.length; i++) {
      // 获取每个元素的文本内容
      const text = elements[i].textContent.trim();

      // 将文本内容添加到数组中
      texts.push(text);
  }

  // 拼接成 Markdown 链接形式
  const markdownLink = `[${texts[0]}](${texts[1]})`;

  // 返回结果
  return markdownLink;
};