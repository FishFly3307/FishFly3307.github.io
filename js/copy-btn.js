/*页面载入完成后，创建复制按钮*/
const copyButton=`<div style="position: absolute;right: 10px;"><clipboard-copy
  class="copy-btn">
    <svg
      height="16"
      width="16"
      style="transform: scale(1.4)"
    >
      <path
        fill-rule="evenodd"
        d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
      ></path>
      <path
        fill-rule="evenodd"
        d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
      ></path>
    </svg>
    <svg
      height="16"
      width="16"
      style="display: none;"
    >
      <path
        fill-rule="evenodd"
        d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
      ></path>
    </svg>
  </clipboard-copy></div>`;
function copyHtml(code){
    return `<div style="position: absolute;right: 10px;"><clipboard-copy
  class="copy-btn" value="${code}">
    <svg
      height="16"
      width="16"
    >
      <path
        fill-rule="evenodd"
        d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
      ></path>
      <path
        fill-rule="evenodd"
        d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
      ></path>
    </svg>
    <svg
      height="16"
      width="16"
      style="display: none;"
    >
      <path
        fill-rule="evenodd"
        d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
      ></path>
    </svg>
  </clipboard-copy></div>`;
}
!function (e, t, a) {
    /* code */
    var initCopyCode = function () {
        // $("figure.highlight").each((index,base)=>{
        //     let copyText= base.querySelector(".code").innerText;
        //     $(base).children().before(copyHtml(copyText.replace(/\n$/,"")));
        // });
        // new ClipboardJS('.copy-btn', {
        //     target: function (trigger) {
        //         trigger.classList.add("copy-title");
        //         setTimeout(function(){
        //             trigger.classList.remove("copy-title");
        //         },2500)
        //         return trigger.getAttribute("value");
        //     }
        // });
        $("figure.highlight").children().before(copyButton)
        const clipboardDom = new ClipboardJS('.copy-btn', {
            target: function (trigger) {
                // trigger.classList.add("copy-title");
                trigger.classList.add('tooltipped' ,'tooltipped-s');
                trigger.setAttribute('aria-label', "Copied");
                setTimeout(function(){
                    // trigger.classList.remove("copy-title");
                    trigger.classList.remove('tooltipped' ,'tooltipped-s');
                    trigger.setAttribute('aria-label', "");
                },2500)
                return trigger.parentElement.nextElementSibling.querySelector(".code");
            }
        });
        clipboardDom.on("success",function(e){
            e.clearSelection();
        })
    }
    initCopyCode();
}(window, document);
function createNode(text){
    const node = document.createElement('pre')
    node.style.width = '1px'
    node.style.height = '1px'
    node.style.position = 'fixed'
    node.style.top = '5px'
    node.textContent = text
    return node;
}

function copyNode(node) {
    if ('clipboard' in navigator) {
        return navigator.clipboard.writeText(node.textContent || '')
    }

    const selection = getSelection()
    if (selection == null) {
        return Promise.reject(new Error())
    }

    selection.removeAllRanges()

    const range = document.createRange()
    range.selectNodeContents(node)
    selection.addRange(range)

    document.execCommand('copy')
    selection.removeAllRanges()
}