---
aliases: [excel-python]
创建时间: 2025-03-10 10:57
最新更新时间: 2025-03-10 17:20
---

```
请帮我写一个python接口，是用python处理excel的接口。﻿ 
接口功能：读取 input.xls，这个表格里有很多sheet，我会指定一个表头列表，这这个列表里都是列名，python接口要将表格里包含表头列表里的列都删掉。
要求：
1. 要进行边界处理和异常和特殊情况提示和处理
2. 请优化输出提示，告知现在进行哪个步骤，操作哪些文档，结果怎么样。
3. 不要改变表格其他的内容
```


```
请帮我写一个python接口，是用python处理excel的接口。﻿ 
接口功能：读取 input1.xls，这个表格里有很多sheet，每个sheet有很多单元格。其中有一些单元格是空的，请填充每个sheet的空白单元格，填充内容为“暂无记录”。
要求：
1. 要进行边界处理和异常和特殊情况提示和处理
2. 请优化输出提示，告知现在进行哪个步骤，操作哪些文档，结果怎么样
3. 不要改变表格其他的内容
```




```
请帮我写一个python接口，是用python处理excel的接口。﻿ 
接口功能：读取 input2.xls，这个表格里有很多sheet。调用通义千问qwen-vl-max-latest API将其返回的图片描述添加到单元格。先新建一个名为：“图片描述”的列，然后读取名字为“图片”的列。遍历这一列，看看单元格中是否有图片，如果有图片，则将这张照片提取出来存在本地路径“D:\CODE\sample\imgs”，图片的命名可以和厂商编号这一类的内容结合起来。之后利用Base64 编码的本地文件发送给通义千问VL，这个api会返回对这张图片的描述，把这个描绘填写进相对应的“图片描述”的单元格。如果没有图片，则跳过这一单元格

通义千问qwen-vl-max-latest API调用详情：
import os
from openai import OpenAI
import base64

client = OpenAI(
    # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)


#  Base64 编码格式
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


base64_image = encode_image("test.png")

completion = client.chat.completions.create(
    model="qwen-vl-max-latest",
    messages=[
        {
            "role": "system",
            "content": [{"type": "text", "text": "You are a helpful assistant."}],
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/png;base64,{base64_image}"},
                },
                {"type": "text", "text": "这张图片中有哪些实体，请具体描述这些实体"},
            ],
        },
    ],
    # 设置输出数据的模态，当前支持["text"]
    modalities=["text"],
    # stream 必须设置为 True，否则会报错
    stream=True,
    stream_options={"include_usage": True},
)

for chunk in completion:
    if chunk.choices:
        print(chunk.choices[0].delta)
    else:
        print(chunk.usage)

要求：
1. 要进行边界处理和异常和特殊情况提示和处理
2. 请优化输出提示，告知现在进行哪个步骤，操作哪些文档，结果怎么样
3. 不要改变表格其他的内容
```



```
请帮我写一个python接口，是用python处理excel的接口。﻿ 
接口功能：读取 input1.xls，这个表格里有很多sheet。先新建一个名为：“厂商信息拼接”的列，然后读取每个sheet的列和行，帮我拼接每一行的数据成一句话（拼接时排除“厂商信息拼接”这一列）。
示例：
假设列名为：厂商编号 厂商名称 主营产品 联系方式 验厂/认证 合作情况 是否供样 网址  备注 图片描述
假设某一行数据一一对应列名，内容为：
AKF125  
xxxx家庭用品有限公司  
烘焙用品、厨房五金工具
曾小白 总经理 手机:189****9852 地址:广东省春光大道
ISO 9001、ISO 14001、BSCI
暂无记录
暂无记录
暂无记录 
暂无记录
这是一家塑料制品工厂，生产透明手提袋等产品。可能品类包括包装袋、购物袋、文件袋等。具体产品如图所示：透明塑料手提袋，内装有黑色背景、绿色
图案和文字的物品，旁边放置一盆绿植装饰。

则拼接后的句子为：名称为xxxx家庭用品有限公司的厂商，其信息如下：厂商编号为AKF125，主营产品为烘焙用品、厨房五金工具，联系方式为曾小白 总经理 手机:189****9852 地址:广东省春光大道，验厂/认证为ISO 9001、ISO 14001、BSCI，合作情况为暂无记录，是否供样为暂无记录，网址为暂无记录，备注为暂无记录。图片描述为：这是一家塑料制品工厂，生产透明手提袋等产品。可能品类包括包装袋、购物袋、文件袋等。具体产品如图所示：透明塑料手提袋，内装有黑色背景、绿色图案和文字的物品，旁边放置一盆绿植装饰。

将每一行拼接后的句子保存在每行对应“厂商信息拼接”的单元格里

要求：
1. 要进行边界处理和异常和特殊情况提示和处理
2. 请优化输出提示，告知现在进行哪个步骤，操作哪些文档，结果怎么样
3. 不要改变表格其他的内容
```



