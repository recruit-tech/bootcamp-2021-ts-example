type Item = {
  name: string;
  tagName: string;
  type?: string;
  label: string;
  placeholder?: string;
  values?: { label: string; value: number }[];
  options?: { text: string; value: number }[];
};

const items: Item[] = [
  {
    name: "name",
    label: "お名前",
    tagName: "input",
    type: "text",
    placeholder: "例）山田　太郎",
  },
  {
    name: "email",
    label: "メールアドレス",
    tagName: "input",
    type: "email",
    placeholder: `例）example@gmail.com`,
  },
  {
    name: "tel",
    label: "電話番号",
    tagName: "input",
    type: "tel",
    placeholder: "例）080-1234-5678",
  },
  {
    name: "address",
    label: "ご住所",
    tagName: "input",
    type: "text",
    placeholder: "例）東京都千代田区丸の内1丁目9-2",
  },
  {
    name: "contact",
    label: "ご希望の返信方法",
    tagName: "input",
    type: "radio",
    values: [
      { label: "メール", value: 0 },
      { label: "電話", value: 1 },
      { label: "どちらでも可", value: 2 },
    ],
  },
  {
    name: "time",
    label: "連絡可能な時間帯（電話）",
    tagName: "input",
    type: "checkbox",
    values: [
      { label: "09:00〜12:00", value: 0 },
      { label: "13:00〜16:00", value: 1 },
      { label: "16:00〜19:00", value: 2 },
    ],
  },
  {
    name: "inquiry_kind",
    label: "お問い合せの種類",
    tagName: "select",
    options: [
      { text: "返品について", value: 0 },
      { text: "発送について", value: 1 },
      { text: "その他", value: 2 },
    ],
  },
  {
    name: "inquiry_detail",
    label: "お問い合せ内容",
    tagName: "textarea",
    placeholder: "例）お問い合わせ内容詳細をご記入ください",
  },
];

function createRadioElementDom(item: Item) {
  return `
    <th>
      <label>${item.label}</label>
    </th>
    <td>
    ${item.values
      .map(
        ({ value, label }) =>
          `
          <span class="radioItem">
            <input
              type="radio"
              id="${item.name}${value}"
              name="${item.name}"
              value="${value}"
            />
            <label for="${item.name}${value}">${label}</label>
          </span>
          `
      )
      .join("")}
    </td>
  `;
}

function createCheckBoxElementDom(item: Item) {
  return `
    <th>
      <label>${item.label}</label>
    </th>
    <td>
    ${item.values
      .map(
        ({ value, label }) =>
          `
          <span class="radioItem">
            <input
              type="checkbox"
              id="${item.name}${value}"
              name="${item.name}"
              value="${value}"
            />
            <label for="${item.name}${value}">${label}</label>
          </span>
          `
      )
      .join("")}
    </td>
  `;
}

function createInputElementDom(item: Item) {
  return `
    <th>
      <label>${item.label}</label>
    </th>
    <td>
      <input
        type="${item.type}"
        name="${item.name}"
        placeholder="${item.placeholder}"
      />
    </td>
  `;
}

function createSelectElementDom(item: Item) {
  return `
    <th>
      <label>${item.label}</label>
    </th>
    <td>
      <select name="${item.name}">
      ${item.options.map(
        ({ value, text }) => `<option value="${value}">${text}</option>`
      )}
      </select>
    </td>
  `;
}

function createTextAreaElementDom(item: Item) {
  return `
    <th><label>${item.label}</label></th>
    <td><textarea placeholder="${item.placeholder}"></textarea></td>
  `;
}

function createElementDom() {
  const list = items
    .map((item) => {
      switch (item.tagName) {
        case "input":
          if (item.type === "radio") {
            return createRadioElementDom(item);
          } else if (item.type === "checkbox") {
            return createCheckBoxElementDom(item);
          } else {
            return createInputElementDom(item);
          }
        case "select":
          return createSelectElementDom(item);
        case "textarea":
          return createTextAreaElementDom(item);
        default:
          throw new Error("Found unhandled element.");
      }
    })
    .map((item) => `<tr>${item}</tr>`)
    .join("");
  return `<table>${list}</table>`;
}

function createFormDom() {
  const form = document.getElementById("form");
  if (!form) throw new Error("Not found form.");
  form.innerHTML = createElementDom();
}
createFormDom();
