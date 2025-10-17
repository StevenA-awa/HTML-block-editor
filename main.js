
function replacePos(string,start,end,new_) {
    return (
        string.slice(0,start)+
        new_+
        string.slice(end || string.length)
    )
}

function setCheck(blocks,check) {
    for (const block of Object.values(blocks)) {
        if (block && block.init) {
            // 保存原有init函数，避免覆盖
            const originalInit = block.init;
            block.init = function() {
                originalInit.call(this);
                // 为当前积木添加检查器
                let oldCheck;
                if (this.previousConnection) {
                    oldCheck = this.previousConnection.getCheck();
                    this.setPreviousStatement(true,oldCheck || check);
                }
                if (this.nextConnection) {
                    oldCheck = this.nextConnection.getCheck();
                    this.setNextStatement(true,oldCheck || check);
                }
                if (this.outputConnection) {
                    oldCheck = this.outputConnection.getCheck();
                    this.setOutput(true,oldCheck || check);
                }
                this.inputList.forEach(input => {
                    if (input.connection) {
                        const oldCheck = input.connection.getCheck();
                        //alert(input.connection.setCheck)
                        input.connection.setCheck(oldCheck || null);
                    }
                });
            };
        }
    }
}

setCheck(Blockly.Blocks,'script');

const jsmin = (() => {
    const leftwords = [
        "function","let","const",
        "var","new","else",
    ];
    
    const asiTriggers = new Set([';', '}', ')', ']', ',', '+', '-', '*', '/', '=', '!', '&', '|', '?', ':', '>', '<']);
    
    const jsmin = function (code) {
        let result = '';
        let pos = 0;
        let stack = {quote: '',singleLineComments: false,multipleLineComments: false};
        for (; pos < code.length; pos++) {
            if (code.length < pos)return 'Error: 引号未闭合';
            if ("\"'`".includes(code[pos]) && !(code[pos-1] === '\\' && code[pos-2] !== '\\')) {
                if (!stack.quote) {
                    stack.quote = code[pos];
                }
                else if (stack.quote === code[pos]) {
                    stack.quote = '';
                }
            }
            else if (!stack.quote) {
                if (" \t\n".includes(code[pos])) {
                    if (
                        !leftwords.find(kw =>
                            kw === code.slice(pos-kw.length,pos)
                        )
                    )continue;
                    if (code[pos-1] && asiTriggers.has(code[pos-1])) {
                        if (result[result.length - 1] !== ';') {
                            result += ';';
                        }
                    }
                }
                if (code[pos]+code[pos+1] === '/*')stack.multipleLineComments = true;
                if (code[pos]+code[pos+1] === '//')stack.singleLineComments = true;
                if (stack.multipleLineComments) {
                    if (code[pos-2]+code[pos-1] !== '*/') {
                        continue;
                    }
                    stack.multipleLineComments = false;
                }
                if (stack.singleLineComments) {
                    if (code[pos] !== '\n') {
                        continue;
                    }
                    stack.singleLineComments = false;
                }
            }
            result += code[pos];
        }
        return result;
    }
    return jsmin;
})();

{
    /*
        这是自动生成的代码
        请勿修改！！！
    */
    const label_attributes_mutator = {
      init: function() {
        this.appendDummyInput('')
          .appendField('标签体');
        this.appendStatementInput('body');
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
      }
    };
    Blockly.common.defineBlocks({label_attributes_mutator});
    const label_id_mutator = {
      init: function() {
        this.appendDummyInput('')
          .appendField('输入标签id');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
      }
    };
    Blockly.common.defineBlocks({label_id_mutator});
    const label_style_mutator = {
      init: function() {
        this.appendDummyInput('')
          .appendField('设置样式');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
      }
    };
    Blockly.common.defineBlocks({label_style_mutator});
    const label_class_mutator = {
      init: function() {
        this.appendDummyInput('')
          .appendField('设置样式类');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
      }
    };
    Blockly.common.defineBlocks({label_class_mutator});
    const decl_lang = {
      init: function() {
        this.appendDummyInput('')
          .appendField('设置语言');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
      }
    };
    Blockly.common.defineBlocks({decl_lang});
}

const AttrMap = [
    {
        block: 'label_id_mutator',
        attr: 'id',
        text: 'id:',
        defaultValue: 'exampleID'
    },
    {
        block: 'label_style_mutator',
        attr: 'style',
        text: '样式:',
        defaultValue: 'width: 500px;height: 300px'
    },
    {
        block: 'label_class_mutator',
        attr: 'class',
        text: '样式类型:',
        defaultValue: 'exampleClass'
    },
    {
        block: 'decl_lang',
        attr: 'lang',
        text: '设置语言为',
        defaultValue: 'zh-CN'
    }
];

const attrMutator = {
    args: null,
    mutationToDom: function() {
        if (!this.args) this.args = [];
        const container = document.createElement('mutation');
        container.setAttribute('args',JSON.stringify(this.args || []));
        //log(this.args)
        return container;
    },
    domToMutation: function(xmlElement) {
        if (!this.args) this.args = [];
        this.args = JSON.parse(xmlElement.getAttribute('args') || "[]");
        //log(this.args)
        this.updateShape();
    },
    decompose: function(workspace) {
        if (!this.args) this.args = [];
        const topBlock = workspace.newBlock('label_attributes_mutator');
        topBlock.initSvg();
        let prevConnection = topBlock.getInput('body').connection;
        for (const attr of this.args) {
            const block = workspace.newBlock(AttrMap.find(item => item.attr === attr).block);
            block.initSvg();
            prevConnection.connect(block.previousConnection);
            prevConnection = block.nextConnection;
        }
        this.updateShape();
        return topBlock;
    },
    compose: function(topBlock) {
        this.args = [];//清零
        const bodyInput = topBlock.getInput('body');
        let block = bodyInput.connection.targetBlock();
        for (;block; block = block.nextConnection.targetBlock()) {
            this.args.push(AttrMap.find(item => item.block === block.type).attr);
        }
        this.updateShape();
    },
    updateShape: function () {
        for (const attr of AttrMap) {
            if (this.args.includes(attr.attr) && !this.getInput(attr.attr)) {
                this.appendDummyInput(attr.attr)
                    .appendField(attr.text)
                    .appendField(new Blockly.FieldTextInput(attr.defaultValue),attr.attr);
            }
            else if (!this.args.includes(attr.attr) && this.getInput(attr.attr)) {
                this.removeInput(attr.attr);
            }
        }
        this.args = Array.from(new Set(this.args));
    },
    attrToCode: function() {
        //初始值为一个包含空字符串的数组
        //这样如果没有参数那么就会返回空字符串
        //而在有参数的时候在前面会自动多一个空格
        const attrs = [''];
        for (const attr of this.args) {
            const value = this.getFieldValue(attr);
            attrs.push(`${attr}=${JSON.stringify(value)}`);
        }
        return attrs.join(' ');
    }
};

Blockly.Extensions.registerMutator(
    'html_label',
    attrMutator,
    void 0,
    AttrMap.filter(a => a.block.startsWith('label_')).map(a => a.block)
);

Blockly.Extensions.registerMutator(
    'html_HTML',
    attrMutator,
    void 0,
    AttrMap.filter(a => a.block.startsWith('decl_')).map(a => a.block)
);

(Blockly => {
    //这段代码大部分是自动生成的
    //请勿修改
    function setMutator(block,mutator) {
        Blockly.Extensions.apply(mutator,block,true);
    }
    const html_doctype = {
      init: function() {
        this.appendDummyInput('')
          .appendField('声明文档类型为 HTML');
        this.setNextStatement(true,['document','html-doctype']);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
      }
    };
    javascript.javascriptGenerator.forBlock['html_doctype'] = function() {
        const code = '<!DOCTYPE HTML>\n';
        return code;
    }
    const html_html = {
      init: function() {
        this.appendDummyInput('html')
          .appendField('HTML根节点');
        this.appendStatementInput('doc');
        this.setPreviousStatement(true, 'html-doctype');
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
        setMutator(this,'html_HTML');
      }
    };
    javascript.javascriptGenerator.forBlock['html_html'] = function(block,generator) {
        const statement_doc = generator.statementToCode(block, 'doc');
        const attrs = this.attrToCode();
        const code = '<html'+attrs+'>\n'+statement_doc+'\n</html>\n';
        return code;
    }
    const html_head = {
      init: function() {
        this.appendEndRowInput('')
          .appendField('头部节点');
        this.appendStatementInput('head');
        this.setInputsInline(false)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
      }
    };
    javascript.javascriptGenerator.forBlock['html_head'] = function(block,generator) {
        const statement_head = generator.statementToCode(block, 'head');
        const code = '<head>\n'+statement_head+'\n</head>\n';
        return code;
    }
    const html_body = {
      init: function() {
        this.appendEndRowInput('')
          .appendField('主体节点');
        this.appendStatementInput('body');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
      }
    };
    javascript.javascriptGenerator.forBlock['html_body'] = function(block,generator) {
        const statement_body = generator.statementToCode(block, 'body');
        const code = '<body>\n'+statement_body+'\n</body>\n';
        return code;
    }
    const html_div = {
      init: function() {
        this.appendEndRowInput('')
          .appendField('组合');
        this.appendStatementInput('div');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(225);
        setMutator(this,'html_label');
      }
    };
    javascript.javascriptGenerator.forBlock['html_div'] = function(block,generator) {
          const statement_div = generator.statementToCode(block, 'div');
          const attrs = this.attrToCode();
          const code = `<div${attrs}>\n${statement_div}\n</div>\n`;
          return code;
    }
    const html_p = {
      init: function() {
        this.appendDummyInput('')
          .appendField('段落文本')
          .appendField(new Blockly.FieldTextInput('hello world!'), 'para');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
        setMutator(this,'html_label');
      }
    };
    javascript.javascriptGenerator.forBlock['html_p'] = function(block,generator) {
          const text_para = block.getFieldValue('para');
          const attrs = this.attrToCode();
          const code = `<p${attrs}>${text_para}</p>\n`;
          return code;
    }
    const html_a = {
      init: function() {
        this.appendDummyInput('')
          .appendField('超链接')
          .appendField(new Blockly.FieldTextInput('https://example.com'), 'href')
          .appendField('并显示为')
          .appendField(new Blockly.FieldTextInput('点击跳转'), 'context');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
        setMutator(this,'html_label');
      }
    };
    javascript.javascriptGenerator.forBlock['html_a'] = function(block,generator) {
        const text_href = block.getFieldValue('href');
        const text_context = block.getFieldValue('context');
        const href = JSON.stringify(text_href);
        const attrs = this.attrToCode();
        const code = `<a href=${href}${attrs}>${text_context}</a>\n`;
        return code;
    }
    const html_button = {
      init: function() {
        this.appendDummyInput('')
          .appendField('按钮:')
          .appendField(new Blockly.FieldTextInput('button'), 'context');
        this.appendStatementInput('onclick')
          .setCheck('script')
          .appendField('当被点击时：');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
        setMutator(this,'html_label');
      }
    };
    javascript.javascriptGenerator.forBlock['html_button'] = function(block,generator) {
        const text_context = block.getFieldValue('context');
        const statement_onclick = generator.statementToCode(block, 'onclick');
        const onclick = JSON.stringify(jsmin(statement_onclick));
        const attrs = this.attrToCode();
        const code = `<button onclick=${onclick}${attrs}>${text_context}</button>\n`;
        return code;
    }
    const html_scriptLabel = {
      init: function() {
        this.appendDummyInput('')
          .appendField('内联脚本');
        this.appendStatementInput('script').setCheck('script');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(330);
      }
    };
    javascript.javascriptGenerator.forBlock['html_scriptLabel'] = function(block,generator) {
        const statement_script = generator.statementToCode(block, 'script');
        const code = '<script>\n'+statement_script+'\n</script>\n';
        return code;
    }
    const html_styleLabel = {
      init: function() {
        this.appendDummyInput('')
          .appendField('内联样式');
        this.appendStatementInput('style').setCheck('style');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(330);
      }
    };
    javascript.javascriptGenerator.forBlock['html_styleLabel'] = function(block,generator) {
      const statement_style = generator.statementToCode(block, 'style');
      const code = '<style>\n'+statement_style+'\n</style>\n';
      return code;
    }
    Blockly.common.defineBlocks({
        html_doctype,
        html_html,
        html_head,
        html_body,
        html_div,
        html_p,
        html_a,
        html_button,
        html_scriptLabel,
        html_styleLabel
    });
})({
    ...Blockly,
    common: {
        defineBlocks(blocks) {
            setCheck(blocks,'document');
            Blockly.common.defineBlocks(blocks);
        }
    }
});

Blockly.common.defineBlocks({
    variables_new: {
      init: function() {
        this.appendDummyInput('')
          .appendField('创建变量');
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(0);
        this.start = false;
        this.onchange = function({type,blockId}) {
            if (type === "toolbox_item_select" && !this.start) {
                const name = prompt("输入变量名");
                workspace.createVariable(name,"");
                this.dispose();//删除自己
                this.start = true;
            }
        }
      }
    }
});
(Blockly => {
    const css_labelSelect = {
      init: function() {
        this.appendDummyInput('')
          .appendField('按')
          .appendField(new Blockly.FieldDropdown([
              ['段落', 'p'],
              ['按钮', 'button'],
              ['超链接', 'a'],
              ['图片', 'img']
            ]), 'label')
          .appendField('设置样式');
        this.appendStatementInput('body');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
      }
    };
    javascript.javascriptGenerator.forBlock['css_labelSelect'] = function(block,generator) {
        const dropdown_label = block.getFieldValue('label');
        const statement_body = generator.statementToCode(block, 'body');
        const code = `${dropdown_label} {\n${statement_body}\n}`;
        return code;
    }
    const css_classSelect = {
      init: function() {
        this.appendDummyInput('')
          .appendField('按样式类')
          .appendField(new Blockly.FieldTextInput('exampleClass'), 'class')
          .appendField('设置样式');
        this.appendStatementInput('body');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
      }
    };
    javascript.javascriptGenerator.forBlock['css_classSelect'] = function(block,generator) {
        const text_class = block.getFieldValue('class');
        const statement_body = generator.statementToCode(block, 'body');
        const code = `.${text_class} {\n${statement_body}\n}`;
        return code;
    }
    const css_idSelect = {
      init: function() {
        this.appendDummyInput('')
          .appendField('按id')
          .appendField(new Blockly.FieldTextInput('exampleID'), 'id')
          .appendField('设置样式');
        this.appendStatementInput('body');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(180);
      }
    };
    javascript.javascriptGenerator.forBlock['css_idSelect'] = function(block,generator) {
        const text_id = block.getFieldValue('id');
        const statement_body = generator.statementToCode(block, 'body');
        const code = `#${text_id} {\n${statement_body}\n}`;
        return code;
    }
    const css_fontFamily = {
      init: function() {
        this.appendDummyInput('')
          .appendField('设置字体为')
          .appendField(new Blockly.FieldTextInput('微软雅黑'), 'font');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(120);
      }
    };
    javascript.javascriptGenerator.forBlock['css_fontFamily'] = function(block,generator) {
        const text_font = block.getFieldValue('font');
        const code = `font-family: ${text_font};`;
        return code;
    }
    const css_fontSize = {
      init: function() {
        this.appendDummyInput('')
          .appendField('设置字体大小')
          .appendField(new Blockly.FieldNumber(10), 'size')
          .appendField(new Blockly.FieldDropdown([
              ['像素', 'px'],
              ['%', '%']
            ]), 'unit');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(120);
      }
    };
    javascript.javascriptGenerator.forBlock['css_fontSize'] = function(block,generator) {
      const number_size = block.getFieldValue('size');
      const dropdown_unit = block.getFieldValue('unit');
      const code = `font-size: ${number_size}${dropdown_unit};`;
      return code;
    }
    const css_fontSizeMode = {
      init: function() {
        this.appendDummyInput('')
          .appendField('将字体大小设置为')
          .appendField(new Blockly.FieldDropdown([
              ['小', 'small'],
              ['中', 'medium'],
              ['大', 'large'],
              ['超级大！！！', 'x-large']
            ]), 'mode');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(120);
      }
    };
    javascript.javascriptGenerator.forBlock['css_fontSizeMode'] = function(block,generator) {
        const dropdown_mode = block.getFieldValue('mode');
        const code = `font-size: ${dropdown_mode};`;
        return code;
    }
    const css_fontStyle = {
      init: function() {
        this.appendDummyInput('')
          .appendField('设置字体样式')
          .appendField(new Blockly.FieldDropdown([
              ['正常', 'normal'],
              ['斜体', 'italic'],
              ['倾斜', 'oblique']
            ]), 'style');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(120);
      }
    };
    javascript.javascriptGenerator.forBlock['css_fontStyle'] = function(block,generator) {
        const dropdown_style = block.getFieldValue('style');
        const code = `font-style: ${dropdown_style};`;
        return code;
    }
    const css_fontWeight = {
      init: function() {
        this.appendDummyInput('')
          .appendField('将字体粗细设置为')
          .appendField(new Blockly.FieldDropdown([
              ['正常', 'normal'],
              ['粗', 'bold'],
              ['非常粗', 'bolder'],
              ['较细', 'lighter']
            ]), 'mode');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(120);
      }
    };
    javascript.javascriptGenerator.forBlock['css_fontWeight'] = function(block,generator) {
        const dropdown_mode = block.getFieldValue('mode');
        const code = `font-weight: ${dropdown_mode};`;
        return code;
    }
    const css_fontWightSize = {
      init: function() {
        this.appendDummyInput('')
          .appendField('将字体宽度设置为')
          .appendField(new Blockly.FieldNumber(0, 100, 900, 100), 'width');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(120);
      }
    };
    javascript.javascriptGenerator.forBlock['css_fontWightSize'] = function(block,generator) {
        const number_width = block.getFieldValue('width');
        const code = `font-style: ${number_width};`;
        return code;
    }
    const css_fontVariant = {
      init: function() {
        this.appendDummyInput('')
          .appendField('设置字体小大写字母')
          .appendField(new Blockly.FieldDropdown([
              ['启用', 'small-caps'],
              ['不启用', 'normal'],
              ['继承', 'inherit'],
            ]), 'mode');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(120);
      }
    };
    javascript.javascriptGenerator.forBlock['css_fontVariant'] = function(block,generator) {
        const dropdown_mode = block.getFieldValue('mode');
        const code = `font-variant: ${dropdown_mode};`;
        return code;
    }
    const css_color = {
      init: function() {
        this.appendDummyInput('')
          .appendField('设置前景色为')
          .appendField(new FieldColour('#ff0000'), 'color');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(270);
      }
    };
    javascript.javascriptGenerator.forBlock['css_color'] = function(block,generator) {
        const colour_color = block.getFieldValue('color');
        const code = `color: ${colour_color};`;
        return code;
    }
    const css_textAlign = {
      init: function() {
        this.appendDummyInput('')
          .appendField('设置段落')
          .appendField(new Blockly.FieldDropdown([
              ['左对齐', 'left'],
              ['居中', 'center'],
              ['右对齐', 'right'],
            ]), 'mode');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(270);
      }
    };
    javascript.javascriptGenerator.forBlock['css_textAlign'] = function(block,generator) {
        const dropdown_mode = block.getFieldValue('mode');
        const code = `text-align: ${dropdown_mode};`;
        return code;
    }
    Blockly.common.defineBlocks({
        css_labelSelect,
        css_classSelect,
        css_idSelect,
        css_fontFamily,
        css_fontSize,
        css_fontSizeMode,
        css_fontStyle,
        css_fontWeight,
        css_fontWightSize,
        css_fontVariant,
        css_color,
        css_textAlign
    });
})({
    ...Blockly,
    common: {
        defineBlocks(blocks) {
            setCheck(blocks,'style');
            Blockly.common.defineBlocks(blocks);
        }
    }
});

(Blockly => {
    const functions_arrowFunction = {
      init: function() {
        this.appendDummyInput('')
          .appendField('定义箭头函数');
        this.appendStatementInput('body');
        this.setOutput(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(315);
      }
    };
    javascript.javascriptGenerator.forBlock['functions_arrowFunction'] = function(block,generator) {
        const statement_body = generator.statementToCode(block, 'body');
        const code = '(() => {\n'+statement_body+'\n})';
        return [code, javascript.Order.NONE];
    }
    const functions_functionExpr = {
      init: function() {
        this.appendDummyInput('')
          .appendField('函数表达式');
        this.appendStatementInput('body');
        this.setOutput(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(315);
      }
    };
    javascript.javascriptGenerator.forBlock['functions_functionExpr'] = function(block,generator) {
        const statement_body = generator.statementToCode(block, 'body');
        const code = '(function() {\n'+statement_body+'\n})';
        return [code, javascript.Order.NONE];
    }
    Blockly.common.defineBlocks({
        functions_arrowFunction,
        functions_functionExpr
    });
})({
    ...Blockly,
    common: {
        defineBlocks(blocks) {
            setCheck(blocks,'script');
            Blockly.common.defineBlocks(blocks);
        }
    }
})

{
    //修改一些内容
    //比如把部分积木改为行内格式
    const Blocks = Blockly.libraryBlocks;
    {
        const block = Blocks.logic.blocks.logic_ternary;
        const init = block.init;
        block.init = function(...args) {
            init.call(this,...args);
            this.setInputsInline(true);
        }
    }
    {
        const block = Blocks.lists.blocks.lists_create_with;
        const init = block.init;
        block.init = function(...args) {
            init.call(this,...args);
            this.setInputsInline(true);
        }
    }
    {
        const block = Blocks.texts.blocks.text_join;
        const init = block.init;
        block.init = function(...args) {
            init.call(this,...args);
            this.setInputsInline(true);
        }
    }
}

const workspace = Blockly.inject('blocklyContainer', {
    media: 'https://unpkg.com/blockly/media/',
    renderer: 'zelos',
    toolbox: {
        "kind": "categoryToolbox",
        "contents": [
            {
                "kind": "category",
                "name": "文档",
                "colour": "#5C81A6",
                "contents": [
                    {
                        "kind": "category",
                        "name": "声明",
                        "colour": "#5C81A6",
                        "contents": [
                            {"kind": "block", "type": "html_doctype"},
                            {"kind": "block", "type": "html_html"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "框架",
                        "colour": "#5C81A6",
                        "contents": [
                            {"kind": "block", "type": "html_head"},
                            {"kind": "block", "type": "html_body"},
                            {"kind": "block", "type": "html_div"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "内容",
                        "colour": "#5BA5A5",
                        "contents": [
                            {"kind": "block", "type": "html_p"},
                            {"kind": "block", "type": "html_a"},
                            {"kind": "block", "type": "html_button"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "内联",
                        "colour": "#5BA5A5",
                        "contents": [
                            {"kind": "block", "type": "html_scriptLabel"},
                            {"kind": "block", "type": "html_styleLabel"}
                        ]
                    }
                ]
            },
            {
                "kind": "category",
                "name": "样式",
                "colour": "#5C81A6",
                "contents": [
                    {
                        "kind": "category",
                        "name": "选择器",
                        "colour": "#5C81A6",
                        "contents": [
                            {"kind": "block", "type": "css_labelSelect"},
                            {"kind": "block", "type": "css_classSelect"},
                            {"kind": "block", "type": "css_idSelect"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "文本",
                        "colour": "#5BA55B",
                        "contents": [
                            {"kind": "block", "type": "css_fontFamily"},
                            {"kind": "block", "type": "css_fontSize"},
                            {"kind": "block", "type": "css_fontSizeMode"},
                            {"kind": "block", "type": "css_fontStyle"},
                            {"kind": "block", "type": "css_fontWeight"},
                            {"kind": "block", "type": "css_fontWightSize"},
                            {"kind": "block", "type": "css_fontVariant"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "属性与段落",
                        "colour": "#5BA55B",
                        "contents": [
                            {"kind": "block", "type": "css_color"},
                            {"kind": "block", "type": "css_textAlign"}
                        ]
                    }
                ]
            },
            {
                "kind": "category",
                "name": "脚本",
                "colour": "#5C81A6",
                "contents": [
                    {
                        "kind": "category",
                        "name": "逻辑",
                        "colour": "#5C81A6",
                        "contents": [
                            {"kind": "block", "type": "logic_boolean"},
                            {"kind": "block", "type": "logic_compare"},
                            {"kind": "block", "type": "logic_operation"},
                            {"kind": "block", "type": "logic_negate"},
                            {"kind": "block", "type": "logic_null"},
                            {"kind": "block", "type": "logic_ternary"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "控制",
                        "colour": "#9C27B0",
                        "contents": [
                            {"kind": "block", "type": "controls_if"},
                            {"kind": "block", "type": "controls_ifelse"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "循环",
                        "colour": "#5CA65C",
                        "contents": [
                            {"kind": "block", "type": "controls_repeat"},
                            {"kind": "block", "type": "controls_repeat_ext"},
                            {"kind": "block", "type": "controls_whileUntil"},
                            {"kind": "block", "type": "controls_for"},
                            {"kind": "block", "type": "controls_forEach"},
                            {"kind": "block", "type": "controls_flow_statements"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "数学",
                        "colour": "#F44336",
                        "contents": [
                            {"kind": "block", "type": "math_number"},
                            {"kind": "block", "type": "math_arithmetic"},
                            {"kind": "block", "type": "math_single"},
                            {"kind": "block", "type": "math_trig"},
                            {"kind": "block", "type": "math_constant"},
                            {"kind": "block", "type": "math_number_property"},
                            {"kind": "block", "type": "math_random_int"},
                            {"kind": "block", "type": "math_random_float"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "文本",
                        "colour": "#FF9800",
                        "contents": [
                            {"kind": "block", "type": "text"},
                            {"kind": "block", "type": "text_join"},
                            {"kind": "block", "type": "text_length"},
                            {"kind": "block", "type": "text_indexOf"},
                            {"kind": "block", "type": "text_charAt"},
                            {"kind": "block", "type": "text_getSubstring"},
                            {"kind": "block", "type": "text_changeCase"},
                            {"kind": "block", "type": "text_trim"},
                            {"kind": "block", "type": "text_isEmpty"},
                            {"kind": "block", "type": "text_replace"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "变量",
                        "colour": "#4A86E8",
                        "contents": [
                            {"kind": "block", "type": "variables_new"},//自定义的
                            {"kind": "block", "type": "variables_set_dynamic"},
                            {"kind": "block", "type": "variables_get_dynamic"},
                            {"kind": "block", "type": "math_change"},
                            {"kind": "block", "type": "text_append"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "列表",
                        "colour": "#6AA84F",
                        "contents": [
                            {"kind": "block", "type": "lists_create_with"},
                            {"kind": "block", "type": "lists_create_empty"},
                            {"kind": "block", "type": "lists_getIndex"},
                            {"kind": "block", "type": "lists_setIndex"},
                            {"kind": "block", "type": "lists_repeat"},
                            {"kind": "block", "type": "lists_reverse"},
                            {"kind": "block", "type": "lists_indexOf"},
                            {"kind": "block", "type": "lists_isEmpty"},
                            {"kind": "block", "type": "lists_split"},
                            {"kind": "block", "type": "lists_length"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "函数",
                        "colour": "#00BCD4",
                        "contents": [
                            {"kind": "block", "type": "procedures_defnoreturn"},
                            {"kind": "block", "type": "procedures_defreturn"},
                            //{"kind": "block", "type": "procedures_callnoreturn"},
                            //{"kind": "block", "type": "procedures_callreturn"},
                            {"kind": "block", "type": "procedures_ifreturn"},
                            {"kind": "block", "type": "functions_functionExpr"},
                            {"kind": "block", "type": "functions_arrowFunction"}
                        ]
                    },
                    {
                        "kind": "category",
                        "name": "输入/输出",
                        "colour": "#008080",
                        "contents": [
                            {"kind": "block", "type": "text_print"},
                            {"kind": "block", "type": "text_prompt"},
                            //{"kind": "block", "type": "procedures_callnoreturn"},
                            //{"kind": "block", "type": "procedures_callreturn"},
                            //{"kind": "block", "type": "procedures_ifreturn"}
                        ]
                    }
                ]
            }
        ]
    },
    zoom: {
        controls: true, // 显示缩放控件
        wheel: true,    // 支持鼠标滚轮缩放
        startScale: 0.7 // 初始缩放比例
    }
});

function generateCode() {
    let code = Blockly.JavaScript.workspaceToCode(workspace)
        .replace(/var\s+([\w,\s]+);/,m => `<script>${m}</script>`)
    {
        let result;
        if ((result = /\n?<!DOCTYPE HTML>/.exec(code)) !== null) {
            const start = result.index;
            const end = start + result[0].length;
            code = replacePos(code,start,end,'');
            code = '<!DOCTYPE HTML>\n' + code;
        }
    }
    {
        let result;
        let regexp = /\/\/.*\nfunction [\w]+\([^)]*\)\s*\{/g;
        while ((result = regexp.exec(code)) !== null) {
            const startMatch = result.index;
            const start = startMatch + result[0].length;
            let pos = start;
            let stack = {braces: 1,quote: ''};
            for (; stack.braces; pos++) {
                if (code.length < pos)return 'Error: 括号未闭合';
                if (code[pos] == "{" && !stack.quote) {
                    stack.braces ++;
                }
                else if (code[pos] == "}" && !stack.quote) {
                    stack.braces --;
                }
                else if ("\"'`".includes(code[pos])) {
                    if (!stack.quote) {
                        stack.quote = code[pos];
                    }
                    else if (stack.quote === code[pos]) {
                        stack.quote = '';
                    }
                }
            }
            code = replacePos(code,startMatch,pos,`<script>${code.slice(startMatch,pos)}</script>`)
        }
    }
    document.getElementById('codeDisplay').textContent = code || '';
    return code;
}

function runCodePreview() {
    const previewDisplay = document.getElementById('previewDisplay');
    const code = generateCode();
    previewDisplay.innerHTML = code;
    const scripts = previewDisplay.querySelectorAll('script');
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}
