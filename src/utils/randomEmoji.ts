const emojis = [
  "⚪",
  "⚽",
  "⛄",
  "⛔",
  "⛪",
  "⛲",
  "⛵",
  "⛺",
  "⛽",
  "🌀",
  "🌁",
  "🌂",
  "🌃",
  "🌄",
  "🌅",
  "🌆",
  "🌇",
  "🌈",
  "🌉",
  "🌊",
  "🌋",
  "🌍",
  "🌏",
  "🌐",
  "🌑",
  "🌒",
  "🌓",
  "🌔",
  "🌖",
  "🌗",
  "🌙",
  "🌚",
  "🌛",
  "🌜",
  "🌝",
  "🌟",
  "🌭",
  "🌮",
  "🌰",
  "🌲",
  "🌴",
  "🌷",
  "🌸",
  "🌹",
  "🌺",
  "🌻",
  "🌼",
  "🌽",
  "🌾",
  "🌿",
  "🍀",
  "🍁",
  "🍂",
  "🍃",
  "🍄",
  "🍅",
  "🍆",
  "🍇",
  "🍈",
  "🍉",
  "🍋",
  "🍌",
  "🍍",
  "🍎",
  "🍐",
  "🍑",
  "🍒",
  "🍓",
  "🍔",
  "🍕",
  "🍖",
  "🍗",
  "🍘",
  "🍙",
  "🍚",
  "🍛",
  "🍜",
  "🍝",
  "🍞",
  "🍟",
  "🍠",
  "🍡",
  "🍢",
  "🍣",
  "🍤",
  "🍥",
  "🍦",
  "🍧",
  "🍨",
  "🍩",
  "🍪",
  "🍫",
  "🍬",
  "🍭",
  "🍮",
  "🍯",
  "🍰",
  "🍱",
  "🍲",
  "🍳",
  "🍴",
  "🍵",
  "🍶",
  "🍷",
  "🍸",
  "🍹",
  "🍺",
  "🍼",
  "🍾",
  "🎀",
  "🎁",
  "🎂",
  "🎃",
  "🎄",
  "🎅",
  "🎆",
  "🎇",
  "🎈",
  "🎉",
  "🎊",
  "🎋",
  "🎌",
  "🎍",
  "🎎",
  "🎏",
  "🎐",
  "🎑",
  "🎒",
  "🎠",
  "🎡",
  "🎢",
  "🎣",
  "🎤",
  "🎥",
  "🎧",
  "🎨",
  "🎩",
  "🎪",
  "🎫",
  "🎬",
  "🎭",
  "🎮",
  "🎯",
  "🎰",
  "🎱",
  "🎲",
  "🎳",
  "🎴",
  "🎵",
  "🎶",
  "🎷",
  "🎸",
  "🎹",
  "🎺",
  "🎻",
  "🎼",
  "🎽",
  "🎾",
  "🎿",
  "🏀",
  "🏁",
  "🏂",
  "🏃",
  "🏅",
  "🏆",
  "🏇",
  "🏈",
  "🏉",
  "🏊",
  "🏏",
  "🏐",
  "🏑",
  "🏒",
  "🏠",
  "🏡",
  "🏢",
  "🏤",
  "🏥",
  "🏦",
  "🏧",
  "🏨",
  "🏩",
  "🏪",
  "🏫",
  "🏬",
  "🏭",
  "🏮",
  "🏯",
  "🏴",
  "🏸",
  "🏹",
  "🏺",
  "🐀",
  "🐁",
  "🐂",
  "🐃",
  "🐄",
  "🐅",
  "🐆",
  "🐈",
  "🐉",
  "🐊",
  "🐌",
  "🐍",
  "🐏",
  "🐑",
  "🐓",
  "🐔",
  "🐕",
  "🐖",
  "🐗",
  "🐘",
  "🐙",
  "🐚",
  "🐛",
  "🐜",
  "🐝",
  "🐞",
  "🐟",
  "🐠",
  "🐡",
  "🐢",
  "🐣",
  "🐤",
  "🐥",
  "🐦",
  "🐧",
  "🐨",
  "🐪",
  "🐫",
  "🐬",
  "🐭",
  "🐮",
  "🐯",
  "🐰",
  "🐱",
  "🐲",
  "🐳",
  "🐴",
  "🐵",
  "🐶",
  "🐷",
  "🐸",
  "🐹",
  "🐺",
  "🐻",
  "🐼",
  "🐽",
  "👀",
  "👂",
  "👃",
  "👄",
  "👅",
  "👆",
  "👇",
  "👈",
  "👉",
  "👊",
  "👋",
  "👌",
  "👍",
  "👎",
  "👏",
  "👐",
  "👑",
  "👒",
  "👓",
  "👔",
  "👕",
  "👖",
  "👗",
  "👘",
  "👙",
  "👚",
  "👛",
  "👜",
  "👝",
  "👞",
  "👟",
  "👠",
  "👡",
  "👢",
  "👣",
  "👥",
  "👦",
  "👧",
  "👨",
  "👩",
  "👪",
  "👬",
  "👮",
  "👯",
  "👰",
  "👱",
  "👲",
  "👳",
  "👴",
  "👵",
  "👶",
  "👷",
  "👸",
  "👹",
  "👺",
  "👻",
  "👼",
  "👽",
  "👾",
  "👿",
  "💀",
  "💁",
  "💂",
  "💃",
  "💄",
  "💅",
  "💆",
  "💇",
  "💈",
  "💉",
  "💊",
  "💋",
  "💌",
  "💍",
  "💎",
  "💏",
  "💐",
  "💑",
  "💒",
  "💓",
  "💔",
  "💕",
  "💖",
  "💗",
  "💘",
  "💙",
  "💚",
  "💛",
  "💜",
  "💝",
  "💞",
  "💟",
  "💠",
  "💡",
  "💢",
  "💣",
  "💤",
  "💥",
  "💦",
  "💧",
  "💨",
  "💩",
  "💪",
  "💫",
  "💭",
  "💮",
  "💯",
  "💰",
  "💱",
  "💲",
  "💳",
  "💴",
  "💶",
  "💸",
  "💹",
  "💺",
  "💻",
  "💼",
  "💽",
  "💾",
  "💿",
  "📀",
  "📁",
  "📂",
  "📃",
  "📄",
  "📅",
  "📆",
  "📇",
  "📈",
  "📉",
  "📊",
  "📋",
  "📌",
  "📍",
  "📎",
  "📏",
  "📐",
  "📑",
  "📒",
  "📓",
  "📔",
  "📕",
  "📖",
  "📗",
  "📘",
  "📙",
  "📚",
  "📛",
  "📜",
  "📝",
  "📞",
  "📟",
  "📠",
  "📡",
  "📢",
  "📣",
  "📤",
  "📥",
  "📦",
  "📧",
  "📨",
  "📩",
  "📪",
  "📬",
  "📮",
  "📯",
  "📰",
  "📱",
  "📲",
  "📳",
  "📵",
  "📶",
  "📸",
  "📹",
  "📺",
  "📻",
  "📿",
  "🔀",
  "🔁",
  "🔃",
  "🔄",
  "🔅",
  "🔆",
  "🔈",
  "🔉",
  "🔊",
  "🔋",
  "🔌",
  "🔍",
  "🔎",
  "🔏",
  "🔐",
  "🔑",
  "🔒",
  "🔓",
  "🔕",
  "🔖",
  "🔗",
  "🔞",
  "🔥",
  "🔦",
  "🔧",
  "🔨",
  "🔩",
  "🔪",
  "🔬",
  "🔮",
  "🔯",
  "🔰",
  "🔱",
  "🔲",
  "🔳",
  "🔴",
  "🔵",
  "🔶",
  "🔷",
  "🔸",
  "🔹",
  "🔺",
  "🔻",
  "🔼",
  "🕋",
  "🕌",
  "🕍",
  "🕺",
  "🖕",
  "🖤",
  "🗻",
  "🗼",
  "🗽",
  "🗾",
  "😀",
  "😁",
  "😂",
  "😃",
  "😄",
  "😅",
  "😇",
  "😉",
  "😊",
  "😋",
  "😌",
  "😎",
  "😏",
  "😐",
  "😑",
  "😒",
  "😓",
  "😕",
  "😖",
  "😗",
  "😘",
  "😙",
  "😚",
  "😛",
  "😜",
  "😝",
  "😟",
  "😠",
  "😡",
  "😢",
  "😣",
  "😤",
  "😦",
  "😨",
  "😩",
  "😪",
  "😬",
  "😭",
  "😮",
  "😰",
  "😱",
  "😲",
  "😴",
  "😵",
  "😶",
  "😷",
  "😸",
  "😹",
  "😺",
  "😻",
  "😼",
  "😽",
  "😾",
  "😿",
  "🙁",
  "🙂",
  "🙃",
  "🙅",
  "🙆",
  "🙇",
  "🙈",
  "🙉",
  "🙊",
  "🙋",
  "🙌",
  "🙍",
  "🙎",
  "🚀",
  "🚁",
  "🚃",
  "🚄",
  "🚆",
  "🚇",
  "🚈",
  "🚉",
  "🚊",
  "🚌",
  "🚍",
  "🚎",
  "🚏",
  "🚐",
  "🚑",
  "🚒",
  "🚔",
  "🚕",
  "🚖",
  "🚗",
  "🚘",
  "🚙",
  "🚛",
  "🚜",
  "🚝",
  "🚞",
  "🚟",
  "🚠",
  "🚢",
  "🚣",
  "🚤",
  "🚦",
  "🚧",
  "🚨",
  "🚩",
  "🚪",
  "🚫",
  "🚬",
  "🚮",
  "🚯",
  "🚰",
  "🚲",
  "🚳",
  "🚴",
  "🚶",
  "🚷",
  "🚹",
  "🚺",
  "🚻",
  "🚼",
  "🚽",
  "🚿",
  "🛀",
  "🛁",
  "🛂",
  "🛃",
  "🛄",
  "🛌",
  "🛐",
  "🛑",
  "🛕",
  "🛖",
  "🛜",
  "🛝",
  "🛞",
  "🛫",
  "🛴",
  "🛵",
  "🛷",
  "🛹",
  "🛺",
  "🛻",
  "🟠",
  "🟡",
  "🟢",
  "🟣",
  "🟤",
  "🟥",
  "🟦",
  "🟧",
  "🟨",
  "🟩",
  "🟪",
  "🟰",
  "🤌",
  "🤍",
  "🤎",
  "🤐",
  "🤑",
  "🤒",
  "🤓",
  "🤔",
  "🤕",
  "🤖",
  "🤗",
  "🤙",
  "🤚",
  "🤛",
  "🤜",
  "🤝",
  "🤟",
  "🤠",
  "🤡",
  "🤢",
  "🤣",
  "🤤",
  "🤥",
  "🤦",
  "🤨",
  "🤩",
  "🤪",
  "🤫",
  "🤬",
  "🤭",
  "🤮",
  "🤰",
  "🤱",
  "🤳",
  "🤴",
  "🤵",
  "🤶",
  "🤷",
  "🤸",
  "🤹",
  "🤼",
  "🤽",
  "🤿",
  "🥀",
  "🥁",
  "🥂",
  "🥃",
  "🥄",
  "🥇",
  "🥈",
  "🥉",
  "🥊",
  "🥌",
  "🥍",
  "🥎",
  "🥐",
  "🥑",
  "🥒",
  "🥓",
  "🥔",
  "🥕",
  "🥖",
  "🥗",
  "🥘",
  "🥙",
  "🥚",
  "🥛",
  "🥜",
  "🥝",
  "🥟",
  "🥠",
  "🥡",
  "🥢",
  "🥣",
  "🥤",
  "🥥",
  "🥦",
  "🥧",
  "🥨",
  "🥩",
  "🥪",
  "🥬",
  "🥭",
  "🥮",
  "🥯",
  "🥱",
  "🥲",
  "🥳",
  "🥴",
  "🥵",
  "🥷",
  "🥹",
  "🥺",
  "🥻",
  "🥼",
  "🥽",
  "🥾",
  "🦀",
  "🦁",
  "🦂",
  "🦃",
  "🦅",
  "🦆",
  "🦇",
  "🦈",
  "🦉",
  "🦊",
  "🦋",
  "🦌",
  "🦍",
  "🦎",
  "🦏",
  "🦐",
  "🦒",
  "🦓",
  "🦔",
  "🦕",
  "🦖",
  "🦘",
  "🦙",
  "🦚",
  "🦛",
  "🦜",
  "🦝",
  "🦞",
  "🦟",
  "🦠",
  "🦡",
  "🦣",
  "🦥",
  "🦦",
  "🦧",
  "🦨",
  "🦩",
  "🦫",
  "🦬",
  "🦮",
  "🦰",
  "🦱",
  "🦲",
  "🦳",
  "🦴",
  "🦵",
  "🦶",
  "🦷",
  "🦸",
  "🦺",
  "🦻",
  "🦼",
  "🦽",
  "🦾",
  "🧀",
  "🧁",
  "🧃",
  "🧄",
  "🧅",
  "🧆",
  "🧇",
  "🧈",
  "🧉",
  "🧋",
  "🧌",
  "🧍",
  "🧎",
  "🧐",
  "🧑",
  "🧒",
  "🧓",
  "🧔",
  "🧕",
  "🧖",
  "🧗",
  "🧘",
  "🧙",
  "🧚",
  "🧛",
  "🧜",
  "🧝",
  "🧞",
  "🧟",
  "🧠",
  "🧡",
  "🧢",
  "🧣",
  "🧤",
  "🧥",
  "🧧",
  "🧨",
  "🧩",
  "🧪",
  "🧫",
  "🧬",
  "🧭",
  "🧮",
  "🧯",
  "🧰",
  "🧱",
  "🧲",
  "🧳",
  "🧴",
  "🧵",
  "🧶",
  "🧷",
  "🧸",
  "🧹",
  "🧺",
  "🧻",
  "🧼",
  "🧽",
  "🧾",
  "🩰",
  "🩱",
  "🩲",
  "🩴",
  "🩵",
  "🩶",
  "🩸",
  "🩹",
  "🩻",
  "🪀",
  "🪁",
  "🪃",
  "🪄",
  "🪅",
  "🪇",
  "🪐",
  "🪑",
  "🪒",
  "🪓",
  "🪔",
  "🪖",
  "🪗",
  "🪘",
  "🪙",
  "🪚",
  "🪛",
  "🪜",
  "🪝",
  "🪞",
  "🪟",
  "🪠",
  "🪡",
  "🪢",
  "🪣",
  "🪤",
  "🪥",
  "🪦",
  "🪧",
  "🪩",
  "🪪",
  "🪫",
  "🪭",
  "🪮",
  "🪰",
  "🪱",
  "🪲",
  "🪳",
  "🪴",
  "🪵",
  "🪷",
  "🪸",
  "🪹",
  "🪻",
  "🪼",
  "🪿",
  "🫀",
  "🫁",
  "🫃",
  "🫄",
  "🫎",
  "🫐",
  "🫑",
  "🫒",
  "🫓",
  "🫔",
  "🫕",
  "🫗",
  "🫘",
  "🫚",
  "🫠",
  "🫡",
  "🫢",
  "🫣",
  "🫤",
  "🫥",
  "🫦",
  "🫨",
  "🫰",
  "🫱",
  "🫲",
  "🫳",
  "🫴",
  "🫵",
  "🫷",
  "☀️",
  "☁️",
  "☂️",
  "☃️",
  "☄️",
  "☎️",
  "☑️",
  "☘️",
  "☝️",
  "☠️",
  "☢️",
  "☣️",
  "☦️",
  "☪️",
  "☮️",
  "☯️",
  "☸️",
  "☹️",
  "☺️",
  "♀️",
  "♂️",
  "♟️",
  "♠️",
  "♣️",
  "♥️",
  "♦️",
  "♨️",
  "♻️",
  "♾️",
  "⚒️",
  "⚔️",
  "⚕️",
  "⚖️",
  "⚗️",
  "⚙️",
  "⚛️",
  "⚜️",
  "⚠️",
  "⚧️",
  "⚰️",
  "⚱️",
  "⛈️",
  "⛏️",
  "⛑️",
  "⛓️",
  "⛩️",
  "⛰️",
  "⛱️",
  "⛴️",
  "⛷️",
  "⛸️",
  "⛹️",
  "✂️",
  "✈️",
  "✉️",
  "✌️",
  "✍️",
  "✏️",
  "✒️",
  "✔️",
  "✖️",
  "✝️",
  "✡️",
  "✳️",
  "✴️",
  "❄️",
  "❇️",
  "❣️",
  "❤️",
  "➡️",
  "⤴️",
  "⤵️",
  "⬅️",
  "⬆️",
  "⬇️",
  "〰️",
  "〽️",
  "㊗️",
  "㊙️",
  "🅰️",
  "🅱️",
  "🅾️",
  "🅿️",
  "🈂️",
  "🈷️",
  "🌡️",
  "🌤️",
  "🌥️",
  "🌦️",
  "🌧️",
  "🌨️",
  "🌩️",
  "🌪️",
  "🌫️",
  "🌬️",
  "🌶️",
  "🍽️",
  "🎖️",
  "🎗️",
  "🎙️",
  "🎚️",
  "🎛️",
  "🎞️",
  "🎟️",
  "🏋️",
  "🏌️",
  "🏍️",
  "🏎️",
  "🏔️",
  "🏕️",
  "🏖️",
  "🏗️",
  "🏘️",
  "🏙️",
  "🏚️",
  "🏛️",
  "🏜️",
  "🏝️",
  "🏞️",
  "🏟️",
  "🏳️",
  "🏵️",
  "🏷️",
  "🐿️",
  "👁️",
  "📽️",
  "🕉️",
  "🕊️",
  "🕯️",
  "🕰️",
  "🕳️",
  "🕴️",
  "🕵️",
  "🕶️",
  "🕷️",
  "🕸️",
  "🕹️",
  "🖇️",
  "🖊️",
  "🖋️",
  "🖌️",
  "🖍️",
  "🖐️",
  "🖥️",
  "🖨️",
  "🖱️",
  "🖲️",
  "🖼️",
  "🗂️",
  "🗃️",
  "🗄️",
  "🗑️",
  "🗒️",
  "🗓️",
  "🗜️",
  "🗝️",
  "🗞️",
  "🗡️",
  "🗣️",
  "🗨️",
  "🗯️",
  "🗳️",
  "🗺️",
  "🛋️",
  "🛍️",
  "🛎️",
  "🛏️",
  "🛠️",
  "🛡️",
  "🛢️",
  "🛣️",
  "🛤️",
  "🛥️",
  "🛩️",
  "🛰️",
  "🛳️",
  "☝🏻",
  "☝🏼",
  "☝🏽",
  "☝🏾",
  "☝🏿",
  "⛹🏻",
  "⛹🏼",
  "⛹🏽",
  "⛹🏾",
  "⛹🏿",
  "✊🏻",
  "✊🏼",
  "✊🏽",
  "✊🏾",
  "✊🏿",
  "✋🏻",
  "✋🏼",
  "✋🏽",
  "✋🏾",
  "✋🏿",
  "✌🏻",
  "✌🏼",
  "✌🏽",
  "✌🏾",
  "✌🏿",
  "✍🏻",
  "✍🏼",
  "✍🏽",
  "✍🏾",
  "✍🏿",
  "🎅🏻",
  "🎅🏼",
  "🎅🏽",
  "🎅🏾",
  "🎅🏿",
  "🏂🏻",
  "🏂🏼",
  "🏂🏽",
  "🏂🏾",
  "🏂🏿",
  "🏃🏻",
  "🏃🏼",
  "🏃🏽",
  "🏃🏾",
  "🏃🏿",
  "🏄🏻",
  "🏄🏼",
  "🏄🏽",
  "🏄🏾",
  "🏄🏿",
  "🏇🏻",
  "🏇🏼",
  "🏇🏽",
  "🏇🏾",
  "🏇🏿",
  "🏊🏻",
  "🏊🏼",
  "🏊🏽",
  "🏊🏾",
  "🏊🏿",
  "🏋🏻",
  "🏋🏼",
  "🏋🏽",
  "🏋🏾",
  "🏋🏿",
  "🏌🏻",
  "🏌🏼",
  "🏌🏽",
  "🏌🏾",
  "🏌🏿",
  "👂🏻",
  "👂🏼",
  "👂🏽",
  "👂🏾",
  "👂🏿",
  "👃🏻",
  "👃🏼",
  "👃🏽",
  "👃🏾",
  "👃🏿",
  "👆🏻",
  "👆🏼",
  "👆🏽",
  "👆🏾",
  "👆🏿",
  "👇🏻",
  "👇🏼",
  "👇🏽",
  "👇🏾",
  "👇🏿",
  "👈🏻",
  "👈🏼",
  "👈🏽",
  "👈🏾",
  "👈🏿",
  "👉🏻",
  "👉🏼",
  "👉🏽",
  "👉🏾",
  "👉🏿",
  "👊🏻",
  "👊🏼",
  "👊🏽",
  "👊🏾",
  "👊🏿",
  "👋🏻",
  "👋🏼",
  "👋🏽",
  "👋🏾",
  "👋🏿",
  "👌🏻",
  "👌🏼",
  "👌🏽",
  "👌🏾",
  "👌🏿",
  "👍🏻",
  "👍🏼",
  "👍🏽",
  "👍🏾",
  "👍🏿",
  "👎🏻",
  "👎🏼",
  "👎🏽",
  "👎🏾",
  "👎🏿",
  "👏🏻",
  "👏🏼",
  "👏🏽",
  "👏🏾",
  "👏🏿",
  "👐🏻",
  "👐🏼",
  "👐🏽",
  "👐🏾",
  "👐🏿",
  "👦🏻",
  "👦🏼",
  "👦🏽",
  "👦🏾",
  "👦🏿",
  "👧🏻",
  "👧🏼",
  "👧🏽",
  "👧🏾",
  "👧🏿",
  "👨🏻",
  "👨🏼",
  "👨🏽",
  "👨🏾",
  "👨🏿",
  "👩🏻",
  "👩🏼",
  "👩🏽",
  "👩🏾",
  "👩🏿",
  "👮🏻",
  "👮🏼",
  "👮🏽",
  "👮🏾",
  "👮🏿",
  "👰🏻",
  "👰🏼",
  "👰🏽",
  "👰🏾",
  "👰🏿",
  "👱🏻",
  "👱🏼",
  "👱🏽",
  "👱🏾",
  "👱🏿",
  "👲🏻",
  "👲🏼",
  "👲🏽",
  "👲🏾",
  "👲🏿",
  "👳🏻",
  "👳🏼",
  "👳🏽",
  "👳🏾",
  "👳🏿",
  "👴🏻",
  "👴🏼",
  "👴🏽",
  "👴🏾",
  "👴🏿",
  "👵🏻",
  "👵🏼",
  "👵🏽",
  "👵🏾",
  "👵🏿",
  "👶🏻",
  "👶🏼",
  "👶🏽",
  "👶🏾",
  "👶🏿",
  "👷🏻",
  "👷🏼",
  "👷🏽",
  "👷🏾",
  "👷🏿",
  "👸🏻",
  "👸🏼",
  "👸🏽",
  "👸🏾",
  "👸🏿",
  "👼🏻",
  "👼🏼",
  "👼🏽",
  "👼🏾",
  "👼🏿",
  "💁🏻",
  "💁🏼",
  "💁🏽",
  "💁🏾",
  "💁🏿",
  "💂🏻",
  "💂🏼",
  "💂🏽",
  "💂🏾",
  "💂🏿",
  "💃🏻",
  "💃🏼",
  "💃🏽",
  "💃🏾",
  "💃🏿",
  "💅🏻",
  "💅🏼",
  "💅🏽",
  "💅🏾",
  "💅🏿",
  "💆🏻",
  "💆🏼",
  "💆🏽",
  "💆🏾",
  "💆🏿",
  "💇🏻",
  "💇🏼",
  "💇🏽",
  "💇🏾",
  "💇🏿",
  "💏🏻",
  "💏🏼",
  "💏🏽",
  "💏🏾",
  "💏🏿",
  "💑🏻",
  "💑🏼",
  "💑🏽",
  "💑🏾",
  "💑🏿",
  "💪🏻",
  "💪🏼",
  "💪🏽",
  "💪🏾",
  "💪🏿",
  "🕴🏻",
  "🕴🏼",
  "🕴🏽",
  "🕴🏾",
  "🕴🏿",
  "🕵🏻",
  "🕵🏼",
  "🕵🏽",
  "🕵🏾",
  "🕵🏿",
  "🕺🏻",
  "🕺🏼",
  "🕺🏽",
  "🕺🏾",
  "🕺🏿",
  "🖐🏻",
  "🖐🏼",
  "🖐🏽",
  "🖐🏾",
  "🖐🏿",
  "🖕🏻",
  "🖕🏼",
  "🖕🏽",
  "🖕🏾",
  "🖕🏿",
  "🖖🏻",
  "🖖🏼",
  "🖖🏽",
  "🖖🏾",
  "🖖🏿",
  "🙅🏻",
  "🙅🏼",
  "🙅🏽",
  "🙅🏾",
  "🙅🏿",
  "🙆🏻",
  "🙆🏼",
  "🙆🏽",
  "🙆🏾",
  "🙆🏿",
  "🙇🏻",
  "🙇🏼",
  "🙇🏽",
  "🙇🏾",
  "🙇🏿",
  "🙋🏻",
  "🙋🏼",
  "🙋🏽",
  "🙋🏾",
  "🙋🏿",
  "🙌🏻",
  "🙌🏼",
  "🙌🏽",
  "🙌🏾",
  "🙌🏿",
  "🙍🏻",
  "🙍🏼",
  "🙍🏽",
  "🙍🏾",
  "🙍🏿",
  "🙎🏻",
  "🙎🏼",
  "🙎🏽",
  "🙎🏾",
  "🙎🏿",
  "🙏🏻",
  "🙏🏼",
  "🙏🏽",
  "🙏🏾",
  "🙏🏿",
  "🚣🏻",
  "🚣🏼",
  "🚣🏽",
  "🚣🏾",
  "🚣🏿",
  "🚴🏻",
  "🚴🏼",
  "🚴🏽",
  "🚴🏾",
  "🚴🏿",
  "🚵🏻",
  "🚵🏼",
  "🚵🏽",
  "🚵🏾",
  "🚵🏿",
  "🚶🏻",
  "🚶🏼",
  "🚶🏽",
  "🚶🏾",
  "🚶🏿",
  "🛀🏻",
  "🛀🏼",
  "🛀🏽",
  "🛀🏾",
  "🛀🏿",
  "🛌🏻",
  "🛌🏼",
  "🛌🏽",
  "🛌🏾",
  "🛌🏿",
  "🤌🏻",
  "🤌🏼",
  "🤌🏽",
  "🤌🏾",
  "🤌🏿",
  "🤏🏻",
  "🤏🏼",
  "🤏🏽",
  "🤏🏾",
  "🤏🏿",
  "🤘🏻",
  "🤘🏼",
  "🤘🏽",
  "🤘🏾",
  "🤘🏿",
  "🤙🏻",
  "🤙🏼",
  "🤙🏽",
  "🤙🏾",
  "🤙🏿",
  "🤚🏻",
  "🤚🏼",
  "🤚🏽",
  "🤚🏾",
  "🤚🏿",
  "🤛🏻",
  "🤛🏼",
  "🤛🏽",
  "🤛🏾",
  "🤛🏿",
  "🤜🏻",
  "🤜🏼",
  "🤜🏽",
  "🤜🏾",
  "🤜🏿",
  "🤝🏻",
  "🤝🏼",
  "🤝🏽",
  "🤝🏾",
  "🤝🏿",
  "🤞🏻",
  "🤞🏼",
  "🤞🏽",
  "🤞🏾",
  "🤞🏿",
  "🤟🏻",
  "🤟🏼",
  "🤟🏽",
  "🤟🏾",
  "🤟🏿",
  "🤦🏻",
  "🤦🏼",
  "🤦🏽",
  "🤦🏾",
  "🤦🏿",
  "🤰🏻",
  "🤰🏼",
  "🤰🏽",
  "🤰🏾",
  "🤰🏿",
  "🤱🏻",
  "🤱🏼",
  "🤱🏽",
  "🤱🏾",
  "🤱🏿",
  "🤲🏻",
  "🤲🏼",
  "🤲🏽",
  "🤲🏾",
  "🤲🏿",
  "🤳🏻",
  "🤳🏼",
  "🤳🏽",
  "🤳🏾",
  "🤳🏿",
  "🤴🏻",
  "🤴🏼",
  "🤴🏽",
  "🤴🏾",
  "🤴🏿",
  "🤵🏻",
  "🤵🏼",
  "🤵🏽",
  "🤵🏾",
  "🤵🏿",
  "🤶🏻",
  "🤶🏼",
  "🤶🏽",
  "🤶🏾",
  "🤶🏿",
  "🤷🏻",
  "🤷🏼",
  "🤷🏽",
  "🤷🏾",
  "🤷🏿",
  "🤸🏻",
  "🤸🏼",
  "🤸🏽",
  "🤸🏾",
  "🤸🏿",
  "🤹🏻",
  "🤹🏼",
  "🤹🏽",
  "🤹🏾",
  "🤹🏿",
  "🤽🏻",
  "🤽🏼",
  "🤽🏽",
  "🤽🏾",
  "🤽🏿",
  "🤾🏻",
  "🤾🏼",
  "🤾🏽",
  "🤾🏾",
  "🤾🏿",
  "🥷🏻",
  "🥷🏼",
  "🥷🏽",
  "🥷🏾",
  "🥷🏿",
  "🦵🏻",
  "🦵🏼",
  "🦵🏽",
  "🦵🏾",
  "🦵🏿",
  "🦶🏻",
  "🦶🏼",
  "🦶🏽",
  "🦶🏾",
  "🦶🏿",
  "🦸🏻",
  "🦸🏼",
  "🦸🏽",
  "🦸🏾",
  "🦸🏿",
  "🦹🏻",
  "🦹🏼",
  "🦹🏽",
  "🦹🏾",
  "🦹🏿",
  "🦻🏻",
  "🦻🏼",
  "🦻🏽",
  "🦻🏾",
  "🦻🏿",
  "🧍🏻",
  "🧍🏼",
  "🧍🏽",
  "🧍🏾",
  "🧍🏿",
  "🧎🏻",
  "🧎🏼",
  "🧎🏽",
  "🧎🏾",
  "🧎🏿",
  "🧏🏻",
  "🧏🏼",
  "🧏🏽",
  "🧏🏾",
  "🧏🏿",
  "🧑🏻",
  "🧑🏼",
  "🧑🏽",
  "🧑🏾",
  "🧑🏿",
  "🧒🏻",
  "🧒🏼",
  "🧒🏽",
  "🧒🏾",
  "🧒🏿",
  "🧓🏻",
  "🧓🏼",
  "🧓🏽",
  "🧓🏾",
  "🧓🏿",
  "🧔🏻",
  "🧔🏼",
  "🧔🏽",
  "🧔🏾",
  "🧔🏿",
  "🧕🏻",
  "🧕🏼",
  "🧕🏽",
  "🧕🏾",
  "🧕🏿",
  "🧖🏻",
  "🧖🏼",
  "🧖🏽",
  "🧖🏾",
  "🧖🏿",
  "🧗🏻",
  "🧗🏼",
  "🧗🏽",
  "🧗🏾",
  "🧗🏿",
  "🧘🏻",
  "🧘🏼",
  "🧘🏽",
  "🧘🏾",
  "🧘🏿",
  "🧙🏻",
  "🧙🏼",
  "🧙🏽",
  "🧙🏾",
  "🧙🏿",
  "🧚🏻",
  "🧚🏼",
  "🧚🏽",
  "🧚🏾",
  "🧚🏿",
  "🧛🏻",
  "🧛🏼",
  "🧛🏽",
  "🧛🏾",
  "🧛🏿",
  "🧜🏻",
  "🧜🏼",
  "🧜🏽",
  "🧜🏾",
  "🧜🏿",
  "🧝🏻",
  "🧝🏼",
  "🧝🏽",
  "🧝🏾",
  "🧝🏿",
  "🫃🏻",
  "🫃🏼",
  "🫃🏽",
  "🫃🏾",
  "🫃🏿",
  "🫄🏻",
  "🫄🏼",
  "🫄🏽",
  "🫄🏾",
  "🫄🏿",
  "🫅🏻",
  "🫅🏼",
  "🫅🏽",
  "🫅🏾",
  "🫅🏿",
  "🫰🏻",
  "🫰🏼",
  "🫰🏽",
  "🫰🏾",
  "🫰🏿",
  "👨‍⚕️",
  "👨‍⚖️",
  "👨‍✈️",
  "👨‍🌾",
  "👨‍🍳",
  "👨‍🍼",
  "👨‍🎓",
  "👨‍🎤",
  "👨‍🎨",
  "👨‍🏫",
  "👨‍🏭",
  "👨‍💻",
  "👨‍💼",
  "👨‍🔧",
  "👨‍🔬",
  "👨‍🚀",
  "👨‍🚒",
  "👨‍🦯",
  "👨‍🦼",
  "👨‍🦽",
  "👨🏻‍⚕️",
  "👨🏻‍⚖️",
  "👨🏻‍✈️",
  "👨🏻‍🌾",
  "👨🏻‍🍳",
  "👨🏻‍🍼",
  "👨🏻‍🎓",
  "👨🏻‍🎤",
  "👨🏻‍🎨",
  "👨🏻‍🏫",
  "👨🏻‍🏭",
  "👨🏻‍💻",
  "👨🏻‍💼",
  "👨🏻‍🔧",
  "👨🏻‍🔬",
  "👨🏻‍🚀",
  "👨🏻‍🚒",
  "👨🏻‍🦯",
  "👨🏻‍🦼",
  "👨🏻‍🦽",
  "👨🏼‍⚕️",
  "👨🏼‍⚖️",
  "👨🏼‍✈️",
  "👨🏼‍🌾",
  "👨🏼‍🍳",
  "👨🏼‍🍼",
  "👨🏼‍🎓",
  "👨🏼‍🎤",
  "👨🏼‍🎨",
  "👨🏼‍🏫",
  "👨🏼‍🏭",
  "👨🏼‍💻",
  "👨🏼‍💼",
  "👨🏼‍🔧",
  "👨🏼‍🔬",
  "👨🏼‍🚀",
  "👨🏼‍🚒",
  "👨🏼‍🦯",
  "👨🏼‍🦼",
  "👨🏼‍🦽",
  "👨🏽‍⚕️",
  "👨🏽‍⚖️",
  "👨🏽‍✈️",
  "👨🏽‍🌾",
  "👨🏽‍🍳",
  "👨🏽‍🍼",
  "👨🏽‍🎓",
  "👨🏽‍🎤",
  "👨🏽‍🎨",
  "👨🏽‍🏫",
  "👨🏽‍🏭",
  "👨🏽‍💻",
  "👨🏽‍💼",
  "👨🏽‍🔧",
  "👨🏽‍🔬",
  "👨🏽‍🚀",
  "👨🏽‍🚒",
  "👨🏽‍🦯",
  "👨🏽‍🦼",
  "👨🏽‍🦽",
  "👨🏾‍⚕️",
  "👨🏾‍⚖️",
  "👨🏾‍✈️",
  "👨🏾‍🌾",
  "👨🏾‍🍳",
  "👨🏾‍🍼",
  "👨🏾‍🎓",
  "👨🏾‍🎤",
  "👨🏾‍🎨",
  "👨🏾‍🏫",
  "👨🏾‍🏭",
  "👨🏾‍💻",
  "👨🏾‍💼",
  "👨🏾‍🔧",
  "👨🏾‍🔬",
  "👨🏾‍🚀",
  "👨🏾‍🚒",
  "👨🏾‍🦯",
  "👨🏾‍🦼",
  "👨🏾‍🦽",
  "👨🏿‍⚕️",
  "👨🏿‍⚖️",
  "👨🏿‍✈️",
  "👨🏿‍🌾",
  "👨🏿‍🍳",
  "👨🏿‍🍼",
  "👨🏿‍🎓",
  "👨🏿‍🎤",
  "👨🏿‍🎨",
  "👨🏿‍🏫",
  "👨🏿‍🏭",
  "👨🏿‍💻",
  "👨🏿‍💼",
  "👨🏿‍🔧",
  "👨🏿‍🔬",
  "👨🏿‍🚀",
  "👨🏿‍🚒",
  "👨🏿‍🦯",
  "👨🏿‍🦼",
  "👨🏿‍🦽",
  "👩‍⚕️",
  "👩‍⚖️",
  "👩‍✈️",
  "👩‍🌾",
  "👩‍🍳",
  "👩‍🍼",
  "👩‍🎓",
  "👩‍🎤",
  "👩‍🎨",
  "👩‍🏫",
  "👩‍🏭",
  "👩‍💻",
  "👩‍💼",
  "👩‍🔧",
  "👩‍🔬",
  "👩‍🚀",
  "👩‍🚒",
  "👩‍🦯",
  "👩‍🦼",
  "👩‍🦽",
  "👩🏻‍⚕️",
  "👩🏻‍⚖️",
  "👩🏻‍✈️",
  "👩🏻‍🌾",
  "👩🏻‍🍳",
  "👩🏻‍🍼",
  "👩🏻‍🎓",
  "👩🏻‍🎤",
  "👩🏻‍🎨",
  "👩🏻‍🏫",
  "👩🏻‍🏭",
  "👩🏻‍💻",
  "👩🏻‍💼",
  "👩🏻‍🔧",
  "👩🏻‍🔬",
  "👩🏻‍🚀",
  "👩🏻‍🚒",
  "👩🏻‍🦯",
  "👩🏻‍🦼",
  "👩🏻‍🦽",
  "👩🏼‍⚕️",
  "👩🏼‍⚖️",
  "👩🏼‍✈️",
  "👩🏼‍🌾",
  "👩🏼‍🍳",
  "👩🏼‍🍼",
  "👩🏼‍🎓",
  "👩🏼‍🎤",
  "👩🏼‍🎨",
  "👩🏼‍🏫",
  "👩🏼‍🏭",
  "👩🏼‍💻",
  "👩🏼‍💼",
  "👩🏼‍🔧",
  "👩🏼‍🔬",
  "👩🏼‍🚀",
  "👩🏼‍🚒",
  "👩🏼‍🦯",
  "👩🏼‍🦼",
  "👩🏼‍🦽",
  "👩🏽‍⚕️",
  "👩🏽‍⚖️",
  "👩🏽‍✈️",
  "👩🏽‍🌾",
  "👩🏽‍🍳",
  "👩🏽‍🍼",
  "👩🏽‍🎓",
  "👩🏽‍🎤",
  "👩🏽‍🎨",
  "👩🏽‍🏫",
  "👩🏽‍🏭",
  "👩🏽‍💻",
  "👩🏽‍💼",
  "👩🏽‍🔧",
  "👩🏽‍🔬",
  "👩🏽‍🚀",
  "👩🏽‍🚒",
  "👩🏽‍🦯",
  "👩🏽‍🦼",
  "👩🏽‍🦽",
  "👩🏾‍⚕️",
  "👩🏾‍⚖️",
  "👩🏾‍✈️",
  "👩🏾‍🌾",
  "👩🏾‍🍳",
  "👩🏾‍🍼",
  "👩🏾‍🎓",
  "👩🏾‍🎤",
  "👩🏾‍🎨",
  "👩🏾‍🏫",
  "👩🏾‍🏭",
  "👩🏾‍💻",
  "👩🏾‍💼",
  "👩🏾‍🔧",
  "👩🏾‍🔬",
  "👩🏾‍🚀",
  "👩🏾‍🚒",
  "👩🏾‍🦯",
  "👩🏾‍🦼",
  "👩🏾‍🦽",
  "👩🏿‍⚕️",
  "👩🏿‍⚖️",
  "👩🏿‍✈️",
  "👩🏿‍🌾",
  "👩🏿‍🍳",
  "👩🏿‍🍼",
  "👩🏿‍🎓",
  "👩🏿‍🎤",
  "👩🏿‍🎨",
  "👩🏿‍🏫",
  "👩🏿‍🏭",
  "👩🏿‍💻",
  "👩🏿‍💼",
  "👩🏿‍🔧",
  "👩🏿‍🔬",
  "👩🏿‍🚀",
  "👩🏿‍🚒",
  "👩🏿‍🦯",
  "👩🏿‍🦼",
  "👩🏿‍🦽",
  "🧑‍⚕️",
  "🧑‍⚖️",
  "🧑‍✈️",
  "🧑‍🌾",
  "🧑‍🍳",
  "🧑‍🍼",
  "🧑‍🎓",
  "🧑‍🎤",
  "🧑‍🎨",
  "🧑‍🏫",
  "🧑‍🏭",
  "🧑‍💻",
  "🧑‍💼",
  "🧑‍🔧",
  "🧑‍🔬",
  "🧑‍🚀",
  "🧑‍🚒",
  "🧑‍🦯",
  "🧑‍🦼",
  "🧑‍🦽",
  "🧑🏻‍⚕️",
  "🧑🏻‍⚖️",
  "🧑🏻‍✈️",
  "🧑🏻‍🌾",
  "🧑🏻‍🍳",
  "🧑🏻‍🍼",
  "🧑🏻‍🎓",
  "🧑🏻‍🎤",
  "🧑🏻‍🎨",
  "🧑🏻‍🏫",
  "🧑🏻‍🏭",
  "🧑🏻‍💻",
  "🧑🏻‍💼",
  "🧑🏻‍🔧",
  "🧑🏻‍🔬",
  "🧑🏻‍🚀",
  "🧑🏻‍🚒",
  "🧑🏻‍🦯",
  "🧑🏻‍🦼",
  "🧑🏻‍🦽",
  "🧑🏼‍⚕️",
  "🧑🏼‍⚖️",
  "🧑🏼‍✈️",
  "🧑🏼‍🌾",
  "🧑🏼‍🍳",
  "🧑🏼‍🍼",
  "🧑🏼‍🎓",
  "🧑🏼‍🎤",
  "🧑🏼‍🎨",
  "🧑🏼‍🏫",
  "🧑🏼‍🏭",
  "🧑🏼‍💻",
  "🧑🏼‍💼",
  "🧑🏼‍🔧",
  "🧑🏼‍🔬",
  "🧑🏼‍🚀",
  "🧑🏼‍🚒",
  "🧑🏼‍🦯",
  "🧑🏼‍🦼",
  "🧑🏼‍🦽",
  "🧑🏽‍⚕️",
  "🧑🏽‍⚖️",
  "🧑🏽‍✈️",
  "🧑🏽‍🌾",
  "🧑🏽‍🍳",
  "🧑🏽‍🍼",
  "🧑🏽‍🎓",
  "🧑🏽‍🎤",
  "🧑🏽‍🎨",
  "🧑🏽‍🏫",
  "🧑🏽‍🏭",
  "🧑🏽‍💻",
  "🧑🏽‍💼",
  "🧑🏽‍🔧",
  "🧑🏽‍🔬",
  "🧑🏽‍🚀",
  "🧑🏽‍🚒",
  "🧑🏽‍🦯",
  "🧑🏽‍🦼",
  "🧑🏽‍🦽",
  "🧑🏾‍⚕️",
  "🧑🏾‍⚖️",
  "🧑🏾‍✈️",
  "🧑🏾‍🌾",
  "🧑🏾‍🍳",
  "🧑🏾‍🍼",
  "🧑🏾‍🎓",
  "🧑🏾‍🎤",
  "🧑🏾‍🎨",
  "🧑🏾‍🏫",
  "🧑🏾‍🏭",
  "🧑🏾‍💻",
  "🧑🏾‍💼",
  "🧑🏾‍🔧",
  "🧑🏾‍🔬",
  "🧑🏾‍🚀",
  "🧑🏾‍🚒",
  "🧑🏾‍🦯",
  "🧑🏾‍🦼",
  "🧑🏾‍🦽",
  "🧑🏿‍⚕️",
  "🧑🏿‍⚖️",
  "🧑🏿‍✈️",
  "🧑🏿‍🌾",
  "🧑🏿‍🍳",
  "🧑🏿‍🍼",
  "🧑🏿‍🎓",
  "🧑🏿‍🎤",
  "🧑🏿‍🎨",
  "🧑🏿‍🏫",
  "🧑🏿‍🏭",
  "🧑🏿‍💻",
  "🧑🏿‍💼",
  "🧑🏿‍🔧",
  "🧑🏿‍🔬",
  "🧑🏿‍🚀",
  "🧑🏿‍🚒",
  "🧑🏿‍🦯",
  "🧑🏿‍🦼",
  "🧑🏿‍🦽",
  "⛹🏻‍♀️",
  "⛹🏻‍♂️",
  "⛹🏼‍♀️",
  "⛹🏼‍♂️",
  "⛹🏽‍♀️",
  "⛹🏽‍♂️",
  "⛹🏾‍♀️",
  "⛹🏾‍♂️",
  "⛹🏿‍♀️",
  "⛹🏿‍♂️",
  "⛹️‍♀️",
  "⛹️‍♂️",
  "🏃‍♀️",
  "🏃‍♂️",
  "🏃🏻‍♀️",
  "🏃🏻‍♂️",
  "🏃🏼‍♀️",
  "🏃🏼‍♂️",
  "🏃🏽‍♀️",
  "🏃🏽‍♂️",
  "🏃🏾‍♀️",
  "🏃🏾‍♂️",
  "🏃🏿‍♀️",
  "🏃🏿‍♂️",
  "🏄‍♀️",
  "🏄‍♂️",
  "🏄🏻‍♀️",
  "🏄🏻‍♂️",
  "🏄🏼‍♀️",
  "🏄🏼‍♂️",
  "🏄🏽‍♀️",
  "🏄🏽‍♂️",
  "🏄🏾‍♀️",
  "🏄🏾‍♂️",
  "🏄🏿‍♀️",
  "🏄🏿‍♂️",
  "🏊‍♀️",
  "🏊‍♂️",
  "🏊🏻‍♀️",
  "🏊🏻‍♂️",
  "🏊🏼‍♀️",
  "🏊🏼‍♂️",
  "🏊🏽‍♀️",
  "🏊🏽‍♂️",
  "🏊🏾‍♀️",
  "🏊🏾‍♂️",
  "🏊🏿‍♀️",
  "🏊🏿‍♂️",
  "🏋🏻‍♀️",
  "🏋🏻‍♂️",
  "🏋🏼‍♀️",
  "🏋🏼‍♂️",
  "🏋🏽‍♀️",
  "🏋🏽‍♂️",
  "🏋🏾‍♀️",
  "🏋🏾‍♂️",
  "🏋🏿‍♀️",
  "🏋🏿‍♂️",
  "🏋️‍♀️",
  "🏋️‍♂️",
  "🏌🏻‍♀️",
  "🏌🏻‍♂️",
  "🏌🏼‍♀️",
  "🏌🏼‍♂️",
  "🏌🏽‍♀️",
  "🏌🏽‍♂️",
  "🏌🏾‍♀️",
  "🏌🏾‍♂️",
  "🏌🏿‍♀️",
  "🏌🏿‍♂️",
  "🏌️‍♀️",
  "🏌️‍♂️",
  "👮‍♀️",
  "👮‍♂️",
  "👮🏻‍♀️",
  "👮🏻‍♂️",
  "👮🏼‍♀️",
  "👮🏼‍♂️",
  "👮🏽‍♀️",
  "👮🏽‍♂️",
  "👮🏾‍♀️",
  "👮🏾‍♂️",
  "👮🏿‍♀️",
  "👮🏿‍♂️",
  "👯‍♀️",
  "👯‍♂️",
  "👰‍♀️",
  "👰‍♂️",
  "👰🏻‍♀️",
  "👰🏻‍♂️",
  "👰🏼‍♀️",
  "👰🏼‍♂️",
  "👰🏽‍♀️",
  "👰🏽‍♂️",
  "👰🏾‍♀️",
  "👰🏾‍♂️",
  "👰🏿‍♀️",
  "👰🏿‍♂️",
  "👱‍♀️",
  "👱‍♂️",
  "👱🏻‍♀️",
  "👱🏻‍♂️",
  "👱🏼‍♀️",
  "👱🏼‍♂️",
  "👱🏽‍♀️",
  "👱🏽‍♂️",
  "👱🏾‍♀️",
  "👱🏾‍♂️",
  "👱🏿‍♀️",
  "👱🏿‍♂️",
  "👳‍♀️",
  "👳‍♂️",
  "👳🏻‍♀️",
  "👳🏻‍♂️",
  "👳🏼‍♀️",
  "👳🏼‍♂️",
  "👳🏽‍♀️",
  "👳🏽‍♂️",
  "👳🏾‍♀️",
  "👳🏾‍♂️",
  "👳🏿‍♀️",
  "👳🏿‍♂️",
  "👷‍♀️",
  "👷‍♂️",
  "👷🏻‍♀️",
  "👷🏻‍♂️",
  "👷🏼‍♀️",
  "👷🏼‍♂️",
  "👷🏽‍♀️",
  "👷🏽‍♂️",
  "👷🏾‍♀️",
  "👷🏾‍♂️",
  "👷🏿‍♀️",
  "👷🏿‍♂️",
  "💁‍♀️",
  "💁‍♂️",
  "💁🏻‍♀️",
  "💁🏻‍♂️",
  "💁🏼‍♀️",
  "💁🏼‍♂️",
  "💁🏽‍♀️",
  "💁🏽‍♂️",
  "💁🏾‍♀️",
  "💁🏾‍♂️",
  "💁🏿‍♀️",
  "💁🏿‍♂️",
  "💂‍♀️",
  "💂‍♂️",
  "💂🏻‍♀️",
  "💂🏻‍♂️",
  "💂🏼‍♀️",
  "💂🏼‍♂️",
  "💂🏽‍♀️",
  "💂🏽‍♂️",
  "💂🏾‍♀️",
  "💂🏾‍♂️",
  "💂🏿‍♀️",
  "💂🏿‍♂️",
  "💆‍♀️",
  "💆‍♂️",
  "💆🏻‍♀️",
  "💆🏻‍♂️",
  "💆🏼‍♀️",
  "💆🏼‍♂️",
  "💆🏽‍♀️",
  "💆🏽‍♂️",
  "💆🏾‍♀️",
  "💆🏾‍♂️",
  "💆🏿‍♀️",
  "💆🏿‍♂️",
  "💇‍♀️",
  "💇‍♂️",
  "💇🏻‍♀️",
  "💇🏻‍♂️",
  "💇🏼‍♀️",
  "💇🏼‍♂️",
  "💇🏽‍♀️",
  "💇🏽‍♂️",
  "💇🏾‍♀️",
  "💇🏾‍♂️",
  "💇🏿‍♀️",
  "💇🏿‍♂️",
  "🕵🏻‍♀️",
  "🕵🏻‍♂️",
  "🕵🏼‍♀️",
  "🕵🏼‍♂️",
  "🕵🏽‍♀️",
  "🕵🏽‍♂️",
  "🕵🏾‍♀️",
  "🕵🏾‍♂️",
  "🕵🏿‍♀️",
  "🕵🏿‍♂️",
  "🕵️‍♀️",
  "🕵️‍♂️",
  "🙅‍♀️",
  "🙅‍♂️",
  "🙅🏻‍♀️",
  "🙅🏻‍♂️",
  "🙅🏼‍♀️",
  "🙅🏼‍♂️",
  "🙅🏽‍♀️",
  "🙅🏽‍♂️",
  "🙅🏾‍♀️",
  "🙅🏾‍♂️",
  "🙅🏿‍♀️",
  "🙅🏿‍♂️",
  "🙆‍♀️",
  "🙆‍♂️",
  "🙆🏻‍♀️",
  "🙆🏻‍♂️",
  "🙆🏼‍♀️",
  "🙆🏼‍♂️",
  "🙆🏽‍♀️",
  "🙆🏽‍♂️",
  "🙆🏾‍♀️",
  "🙆🏾‍♂️",
  "🙆🏿‍♀️",
  "🙆🏿‍♂️",
  "🙇‍♀️",
  "🙇‍♂️",
  "🙇🏻‍♀️",
  "🙇🏻‍♂️",
  "🙇🏼‍♀️",
  "🙇🏼‍♂️",
  "🙇🏽‍♀️",
  "🙇🏽‍♂️",
  "🙇🏾‍♀️",
  "🙇🏾‍♂️",
  "🙇🏿‍♀️",
  "🙇🏿‍♂️",
  "🙋‍♀️",
  "🙋‍♂️",
  "🙋🏻‍♀️",
  "🙋🏻‍♂️",
  "🙋🏼‍♀️",
  "🙋🏼‍♂️",
  "🙋🏽‍♀️",
  "🙋🏽‍♂️",
  "🙋🏾‍♀️",
  "🙋🏾‍♂️",
  "🙋🏿‍♀️",
  "🙋🏿‍♂️",
  "🙍‍♀️",
  "🙍‍♂️",
  "🙍🏻‍♀️",
  "🙍🏻‍♂️",
  "🙍🏼‍♀️",
  "🙍🏼‍♂️",
  "🙍🏽‍♀️",
  "🙍🏽‍♂️",
  "🙍🏾‍♀️",
  "🙍🏾‍♂️",
  "🙍🏿‍♀️",
  "🙍🏿‍♂️",
  "🙎‍♀️",
  "🙎‍♂️",
  "🙎🏻‍♀️",
  "🙎🏻‍♂️",
  "🙎🏼‍♀️",
  "🙎🏼‍♂️",
  "🙎🏽‍♀️",
  "🙎🏽‍♂️",
  "🙎🏾‍♀️",
  "🙎🏾‍♂️",
  "🙎🏿‍♀️",
  "🙎🏿‍♂️",
  "🚣‍♀️",
  "🚣‍♂️",
  "🚣🏻‍♀️",
  "🚣🏻‍♂️",
  "🚣🏼‍♀️",
  "🚣🏼‍♂️",
  "🚣🏽‍♀️",
  "🚣🏽‍♂️",
  "🚣🏾‍♀️",
  "🚣🏾‍♂️",
  "🚣🏿‍♀️",
  "🚣🏿‍♂️",
  "🚴‍♀️",
  "🚴‍♂️",
  "🚴🏻‍♀️",
  "🚴🏻‍♂️",
  "🚴🏼‍♀️",
  "🚴🏼‍♂️",
  "🚴🏽‍♀️",
  "🚴🏽‍♂️",
  "🚴🏾‍♀️",
  "🚴🏾‍♂️",
  "🚴🏿‍♀️",
  "🚴🏿‍♂️",
  "🚵‍♀️",
  "🚵‍♂️",
  "🚵🏻‍♀️",
  "🚵🏻‍♂️",
  "🚵🏼‍♀️",
  "🚵🏼‍♂️",
  "🚵🏽‍♀️",
  "🚵🏽‍♂️",
  "🚵🏾‍♀️",
  "🚵🏾‍♂️",
  "🚵🏿‍♀️",
  "🚵🏿‍♂️",
  "🚶‍♀️",
  "🚶‍♂️",
  "🚶🏻‍♀️",
  "🚶🏻‍♂️",
  "🚶🏼‍♀️",
  "🚶🏼‍♂️",
  "🚶🏽‍♀️",
  "🚶🏽‍♂️",
  "🚶🏾‍♀️",
  "🚶🏾‍♂️",
  "🚶🏿‍♀️",
  "🚶🏿‍♂️",
  "🤦‍♀️",
  "🤦‍♂️",
  "🤦🏻‍♀️",
  "🤦🏻‍♂️",
  "🤦🏼‍♀️",
  "🤦🏼‍♂️",
  "🤦🏽‍♀️",
  "🤦🏽‍♂️",
  "🤦🏾‍♀️",
  "🤦🏾‍♂️",
  "🤦🏿‍♀️",
  "🤦🏿‍♂️",
  "🤵‍♀️",
  "🤵‍♂️",
  "🤵🏻‍♀️",
  "🤵🏻‍♂️",
  "🤵🏼‍♀️",
  "🤵🏼‍♂️",
  "🤵🏽‍♀️",
  "🤵🏽‍♂️",
  "🤵🏾‍♀️",
  "🤵🏾‍♂️",
  "🤵🏿‍♀️",
  "🤵🏿‍♂️",
  "🤷‍♀️",
  "🤷‍♂️",
  "🤷🏻‍♀️",
  "🤷🏻‍♂️",
  "🤷🏼‍♀️",
  "🤷🏼‍♂️",
  "🤷🏽‍♀️",
  "🤷🏽‍♂️",
  "🤷🏾‍♀️",
  "🤷🏾‍♂️",
  "🤷🏿‍♀️",
  "🤷🏿‍♂️",
  "🤸‍♀️",
  "🤸‍♂️",
  "🤸🏻‍♀️",
  "🤸🏻‍♂️",
  "🤸🏼‍♀️",
  "🤸🏼‍♂️",
  "🤸🏽‍♀️",
  "🤸🏽‍♂️",
  "🤸🏾‍♀️",
  "🤸🏾‍♂️",
  "🤸🏿‍♀️",
  "🤸🏿‍♂️",
  "🤹‍♀️",
  "🤹‍♂️",
  "🤹🏻‍♀️",
  "🤹🏻‍♂️",
  "🤹🏼‍♀️",
  "🤹🏼‍♂️",
  "🤹🏽‍♀️",
  "🤹🏽‍♂️",
  "🤹🏾‍♀️",
  "🤹🏾‍♂️",
  "🤹🏿‍♀️",
  "🤹🏿‍♂️",
  "🤼‍♀️",
  "🤼‍♂️",
  "🤽‍♀️",
  "🤽‍♂️",
  "🤽🏻‍♀️",
  "🤽🏻‍♂️",
  "🤽🏼‍♀️",
  "🤽🏼‍♂️",
  "🤽🏽‍♀️",
  "🤽🏽‍♂️",
  "🤽🏾‍♀️",
  "🤽🏾‍♂️",
  "🤽🏿‍♀️",
  "🤽🏿‍♂️",
  "🤾‍♀️",
  "🤾‍♂️",
  "🤾🏻‍♀️",
  "🤾🏻‍♂️",
  "🤾🏼‍♀️",
  "🤾🏼‍♂️",
  "🤾🏽‍♀️",
  "🤾🏽‍♂️",
  "🤾🏾‍♀️",
  "🤾🏾‍♂️",
  "🤾🏿‍♀️",
  "🤾🏿‍♂️",
  "🦸‍♀️",
  "🦸‍♂️",
  "🦸🏻‍♀️",
  "🦸🏻‍♂️",
  "🦸🏼‍♀️",
  "🦸🏼‍♂️",
  "🦸🏽‍♀️",
  "🦸🏽‍♂️",
  "🦸🏾‍♀️",
  "🦸🏾‍♂️",
  "🦸🏿‍♀️",
  "🦸🏿‍♂️",
  "🦹‍♀️",
  "🦹‍♂️",
  "🦹🏻‍♀️",
  "🦹🏻‍♂️",
  "🦹🏼‍♀️",
  "🦹🏼‍♂️",
  "🦹🏽‍♀️",
  "🦹🏽‍♂️",
  "🦹🏾‍♀️",
  "🦹🏾‍♂️",
  "🦹🏿‍♀️",
  "🦹🏿‍♂️",
  "🧍‍♀️",
  "🧍‍♂️",
  "🧍🏻‍♀️",
  "🧍🏻‍♂️",
  "🧍🏼‍♀️",
  "🧍🏼‍♂️",
  "🧍🏽‍♀️",
  "🧍🏽‍♂️",
  "🧍🏾‍♀️",
  "🧍🏾‍♂️",
  "🧍🏿‍♀️",
  "🧍🏿‍♂️",
  "🧎‍♀️",
  "🧎‍♂️",
  "🧎🏻‍♀️",
  "🧎🏻‍♂️",
  "🧎🏼‍♀️",
  "🧎🏼‍♂️",
  "🧎🏽‍♀️",
  "🧎🏽‍♂️",
  "🧎🏾‍♀️",
  "🧎🏾‍♂️",
  "🧎🏿‍♀️",
  "🧎🏿‍♂️",
  "🧏‍♀️",
  "🧏‍♂️",
  "🧏🏻‍♀️",
  "🧏🏻‍♂️",
  "🧏🏼‍♀️",
  "🧏🏼‍♂️",
  "🧏🏽‍♀️",
  "🧏🏽‍♂️",
  "🧏🏾‍♀️",
  "🧏🏾‍♂️",
  "🧏🏿‍♀️",
  "🧏🏿‍♂️",
  "🧔‍♀️",
  "🧔‍♂️",
  "🧔🏻‍♀️",
  "🧔🏻‍♂️",
  "🧔🏼‍♀️",
  "🧔🏼‍♂️",
  "🧔🏽‍♀️",
  "🧔🏽‍♂️",
  "🧔🏾‍♀️",
  "🧔🏾‍♂️",
  "🧔🏿‍♀️",
  "🧔🏿‍♂️",
  "🧖‍♀️",
  "🧖‍♂️",
  "🧖🏻‍♀️",
  "🧖🏻‍♂️",
  "🧖🏼‍♀️",
  "🧖🏼‍♂️",
  "🧖🏽‍♀️",
  "🧖🏽‍♂️",
  "🧖🏾‍♀️",
  "🧖🏾‍♂️",
  "🧖🏿‍♀️",
  "🧖🏿‍♂️",
  "🧗‍♀️",
  "🧗‍♂️",
  "🧗🏻‍♀️",
  "🧗🏻‍♂️",
  "🧗🏼‍♀️",
  "🧗🏼‍♂️",
  "🧗🏽‍♀️",
  "🧗🏽‍♂️",
  "🧗🏾‍♀️",
  "🧗🏾‍♂️",
  "🧗🏿‍♀️",
  "🧗🏿‍♂️",
  "🧘‍♀️",
  "🧘‍♂️",
  "🧘🏻‍♀️",
  "🧘🏻‍♂️",
  "🧘🏼‍♀️",
  "🧘🏼‍♂️",
  "🧘🏽‍♀️",
  "🧘🏽‍♂️",
  "🧘🏾‍♀️",
  "🧘🏾‍♂️",
  "🧘🏿‍♀️",
  "🧘🏿‍♂️",
  "🧙‍♀️",
  "🧙‍♂️",
  "🧙🏻‍♀️",
  "🧙🏻‍♂️",
  "🧙🏼‍♀️",
  "🧙🏼‍♂️",
  "🧙🏽‍♀️",
  "🧙🏽‍♂️",
  "🧙🏾‍♀️",
  "🧙🏾‍♂️",
  "🧙🏿‍♀️",
  "🧙🏿‍♂️",
  "🧚‍♀️",
  "🧚‍♂️",
  "🧚🏻‍♀️",
  "🧚🏻‍♂️",
  "🧚🏼‍♀️",
  "🧚🏼‍♂️",
  "🧚🏽‍♀️",
  "🧚🏽‍♂️",
  "🧚🏾‍♀️",
  "🧚🏾‍♂️",
  "🧚🏿‍♀️",
  "🧚🏿‍♂️",
  "🧛‍♀️",
  "🧛‍♂️",
  "🧛🏻‍♀️",
  "🧛🏻‍♂️",
  "🧛🏼‍♀️",
  "🧛🏼‍♂️",
  "🧛🏽‍♀️",
  "🧛🏽‍♂️",
  "🧛🏾‍♀️",
  "🧛🏾‍♂️",
  "🧛🏿‍♀️",
  "🧛🏿‍♂️",
  "🧜‍♀️",
  "🧜‍♂️",
  "🧜🏻‍♀️",
  "🧜🏻‍♂️",
  "🧜🏼‍♀️",
  "🧜🏼‍♂️",
  "🧜🏽‍♀️",
  "🧜🏽‍♂️",
  "🧜🏾‍♀️",
  "🧜🏾‍♂️",
  "🧜🏿‍♀️",
  "🧜🏿‍♂️",
  "🧝‍♀️",
  "🧝‍♂️",
  "🧝🏻‍♀️",
  "🧝🏻‍♂️",
  "🧝🏼‍♀️",
  "🧝🏼‍♂️",
  "🧝🏽‍♀️",
  "🧝🏽‍♂️",
  "🧝🏾‍♀️",
  "🧝🏾‍♂️",
  "🧝🏿‍♀️",
  "🧝🏿‍♂️",
  "🧞‍♀️",
  "🧞‍♂️",
  "🧟‍♀️",
  "🧟‍♂️",
  "👨‍🦰",
  "👨‍🦱",
  "👨‍🦲",
  "👨‍🦳",
  "👨🏻‍🦰",
  "👨🏻‍🦱",
  "👨🏻‍🦲",
  "👨🏻‍🦳",
  "👨🏼‍🦰",
  "👨🏼‍🦱",
  "👨🏼‍🦲",
  "👨🏼‍🦳",
  "👨🏽‍🦰",
  "👨🏽‍🦱",
  "👨🏽‍🦲",
  "👨🏽‍🦳",
  "👨🏾‍🦰",
  "👨🏾‍🦱",
  "👨🏾‍🦲",
  "👨🏾‍🦳",
  "👨🏿‍🦰",
  "👨🏿‍🦱",
  "👨🏿‍🦲",
  "👨🏿‍🦳",
  "👩‍🦰",
  "👩‍🦱",
  "👩‍🦲",
  "👩‍🦳",
  "👩🏻‍🦰",
  "👩🏻‍🦱",
  "👩🏻‍🦲",
  "👩🏻‍🦳",
  "👩🏼‍🦰",
  "👩🏼‍🦱",
  "👩🏼‍🦲",
  "👩🏼‍🦳",
  "👩🏽‍🦰",
  "👩🏽‍🦱",
  "👩🏽‍🦲",
  "👩🏽‍🦳",
  "👩🏾‍🦰",
  "👩🏾‍🦱",
  "👩🏾‍🦲",
  "👩🏾‍🦳",
  "👩🏿‍🦰",
  "👩🏿‍🦱",
  "👩🏿‍🦲",
  "👩🏿‍🦳",
  "🧑‍🦰",
  "🧑‍🦱",
  "🧑‍🦲",
  "🧑‍🦳",
  "🧑🏻‍🦰",
  "🧑🏻‍🦱",
  "🧑🏻‍🦲",
  "🧑🏻‍🦳",
  "🧑🏼‍🦰",
  "🧑🏼‍🦱",
  "🧑🏼‍🦲",
  "🧑🏼‍🦳",
  "🧑🏽‍🦰",
  "🧑🏽‍🦱",
  "🧑🏽‍🦲",
  "🧑🏽‍🦳",
  "🧑🏾‍🦰",
  "🧑🏾‍🦱",
  "🧑🏾‍🦲",
  "🧑🏾‍🦳",
  "🧑🏿‍🦰",
  "🧑🏿‍🦱",
  "🧑🏿‍🦲",
  "🧑🏿‍🦳",
  "❤️‍🔥",
  "❤️‍🩹",
  "🏳️‍⚧️",
  "🏳️‍🌈",
  "🏴‍☠️",
  "🐈‍⬛",
  "🐕‍🦺",
  "🐦‍⬛",
  "🐻‍❄️",
  "👁️‍🗨️",
  "😮‍💨",
  "😵‍💫",
  "😶‍🌫️",
  "🧑‍🎄",
];

const personEmojis = [
  "😀",
  "😁",
  "😂",
  "😃",
  "😄",
  "😅",
  "😇",
  "😉",
  "😊",
  "😋",
  "😌",
  "😎",
  "😏",
  "😐",
  "😑",
  "😒",
  "😓",
  "😕",
  "😖",
  "😗",
  "😘",
  "😙",
  "😚",
  "😛",
  "😜",
  "😝",
  "😟",
  "😠",
  "😡",
  "😢",
  "😣",
  "😤",
  "😦",
  "😨",
  "😩",
  "😪",
  "😬",
  "😭",
  "😮",
  "😰",
  "😱",
  "😲",
  "😴",
  "😵",
  "😶",
  "😷",
  "😸",
  "😹",
  "😺",
  "😻",
  "😼",
  "😽",
  "😾",
  "😿",
  "🙁",
  "🙂",
  "🙃",
  "🙅",
  "🙆",
  "🙇",
  "🙈",
  "🙉",
  "🙊",
  "🙋",
  "🙌",
  "🙍",
  "🙎",
  "👨‍⚕️",
  "👨‍⚖️",
  "👨‍✈️",
  "👨‍🌾",
  "👨‍🍳",
  "👨‍🍼",
  "👨‍🎓",
  "👨‍🎤",
  "👨‍🎨",
  "👨‍🏫",
  "👨‍🏭",
  "👨‍💻",
  "👨‍💼",
  "👨‍🔧",
  "👨‍🔬",
  "👨‍🚀",
  "👨‍🚒",
  "👨‍🦯",
  "👨‍🦼",
  "👨‍🦽",
  "👨🏻‍⚕️",
  "👨🏻‍⚖️",
  "👨🏻‍✈️",
  "👨🏻‍🌾",
  "👨🏻‍🍳",
  "👨🏻‍🍼",
  "👨🏻‍🎓",
  "👨🏻‍🎤",
  "👨🏻‍🎨",
  "👨🏻‍🏫",
  "👨🏻‍🏭",
  "👨🏻‍💻",
  "👨🏻‍💼",
  "👨🏻‍🔧",
  "👨🏻‍🔬",
  "👨🏻‍🚀",
  "👨🏻‍🚒",
  "👨🏻‍🦯",
  "👨🏻‍🦼",
  "👨🏻‍🦽",
  "👨🏼‍⚕️",
  "👨🏼‍⚖️",
  "👨🏼‍✈️",
  "👨🏼‍🌾",
  "👨🏼‍🍳",
  "👨🏼‍🍼",
  "👨🏼‍🎓",
  "👨🏼‍🎤",
  "👨🏼‍🎨",
  "👨🏼‍🏫",
  "👨🏼‍🏭",
  "👨🏼‍💻",
  "👨🏼‍💼",
  "👨🏼‍🔧",
  "👨🏼‍🔬",
  "👨🏼‍🚀",
  "👨🏼‍🚒",
  "👨🏼‍🦯",
  "👨🏼‍🦼",
  "👨🏼‍🦽",
  "👨🏽‍⚕️",
  "👨🏽‍⚖️",
  "👨🏽‍✈️",
  "👨🏽‍🌾",
  "👨🏽‍🍳",
  "👨🏽‍🍼",
  "👨🏽‍🎓",
  "👨🏽‍🎤",
  "👨🏽‍🎨",
  "👨🏽‍🏫",
  "👨🏽‍🏭",
  "👨🏽‍💻",
  "👨🏽‍💼",
  "👨🏽‍🔧",
  "👨🏽‍🔬",
  "👨🏽‍🚀",
  "👨🏽‍🚒",
  "👨🏽‍🦯",
  "👨🏽‍🦼",
  "👨🏽‍🦽",
  "👨🏾‍⚕️",
  "👨🏾‍⚖️",
  "👨🏾‍✈️",
  "👨🏾‍🌾",
  "👨🏾‍🍳",
  "👨🏾‍🍼",
  "👨🏾‍🎓",
  "👨🏾‍🎤",
  "👨🏾‍🎨",
  "👨🏾‍🏫",
  "👨🏾‍🏭",
  "👨🏾‍💻",
  "👨🏾‍💼",
  "👨🏾‍🔧",
  "👨🏾‍🔬",
  "👨🏾‍🚀",
  "👨🏾‍🚒",
  "👨🏾‍🦯",
  "👨🏾‍🦼",
  "👨🏾‍🦽",
  "👨🏿‍⚕️",
  "👨🏿‍⚖️",
  "👨🏿‍✈️",
  "👨🏿‍🌾",
  "👨🏿‍🍳",
  "👨🏿‍🍼",
  "👨🏿‍🎓",
  "👨🏿‍🎤",
  "👨🏿‍🎨",
  "👨🏿‍🏫",
  "👨🏿‍🏭",
  "👨🏿‍💻",
  "👨🏿‍💼",
  "👨🏿‍🔧",
  "👨🏿‍🔬",
  "👨🏿‍🚀",
  "👨🏿‍🚒",
  "👨🏿‍🦯",
  "👨🏿‍🦼",
  "👨🏿‍🦽",
  "👩‍⚕️",
  "👩‍⚖️",
  "👩‍✈️",
  "👩‍🌾",
  "👩‍🍳",
  "👩‍🍼",
  "👩‍🎓",
  "👩‍🎤",
  "👩‍🎨",
  "👩‍🏫",
  "👩‍🏭",
  "👩‍💻",
  "👩‍💼",
  "👩‍🔧",
  "👩‍🔬",
  "👩‍🚀",
  "👩‍🚒",
  "👩‍🦯",
  "👩‍🦼",
  "👩‍🦽",
  "👩🏻‍⚕️",
  "👩🏻‍⚖️",
  "👩🏻‍✈️",
  "👩🏻‍🌾",
  "👩🏻‍🍳",
  "👩🏻‍🍼",
  "👩🏻‍🎓",
  "👩🏻‍🎤",
  "👩🏻‍🎨",
  "👩🏻‍🏫",
  "👩🏻‍🏭",
  "👩🏻‍💻",
  "👩🏻‍💼",
  "👩🏻‍🔧",
  "👩🏻‍🔬",
  "👩🏻‍🚀",
  "👩🏻‍🚒",
  "👩🏻‍🦯",
  "👩🏻‍🦼",
  "👩🏻‍🦽",
  "👩🏼‍⚕️",
  "👩🏼‍⚖️",
  "👩🏼‍✈️",
  "👩🏼‍🌾",
  "👩🏼‍🍳",
  "👩🏼‍🍼",
  "👩🏼‍🎓",
  "👩🏼‍🎤",
  "👩🏼‍🎨",
  "👩🏼‍🏫",
  "👩🏼‍🏭",
  "👩🏼‍💻",
  "👩🏼‍💼",
  "👩🏼‍🔧",
  "👩🏼‍🔬",
  "👩🏼‍🚀",
  "👩🏼‍🚒",
  "👩🏼‍🦯",
  "👩🏼‍🦼",
  "👩🏼‍🦽",
  "👩🏽‍⚕️",
  "👩🏽‍⚖️",
  "👩🏽‍✈️",
  "👩🏽‍🌾",
  "👩🏽‍🍳",
  "👩🏽‍🍼",
  "👩🏽‍🎓",
  "👩🏽‍🎤",
  "👩🏽‍🎨",
  "👩🏽‍🏫",
  "👩🏽‍🏭",
  "👩🏽‍💻",
  "👩🏽‍💼",
  "👩🏽‍🔧",
  "👩🏽‍🔬",
  "👩🏽‍🚀",
  "👩🏽‍🚒",
  "👩🏽‍🦯",
  "👩🏽‍🦼",
  "👩🏽‍🦽",
  "👩🏾‍⚕️",
  "👩🏾‍⚖️",
  "👩🏾‍✈️",
  "👩🏾‍🌾",
  "👩🏾‍🍳",
  "👩🏾‍🍼",
  "👩🏾‍🎓",
  "👩🏾‍🎤",
  "👩🏾‍🎨",
  "👩🏾‍🏫",
  "👩🏾‍🏭",
  "👩🏾‍💻",
  "👩🏾‍💼",
  "👩🏾‍🔧",
  "👩🏾‍🔬",
  "👩🏾‍🚀",
  "👩🏾‍🚒",
  "👩🏾‍🦯",
  "👩🏾‍🦼",
  "👩🏾‍🦽",
  "👩🏿‍⚕️",
  "👩🏿‍⚖️",
  "👩🏿‍✈️",
  "👩🏿‍🌾",
  "👩🏿‍🍳",
  "👩🏿‍🍼",
  "👩🏿‍🎓",
  "👩🏿‍🎤",
  "👩🏿‍🎨",
  "👩🏿‍🏫",
  "👩🏿‍🏭",
  "👩🏿‍💻",
  "👩🏿‍💼",
  "👩🏿‍🔧",
  "👩🏿‍🔬",
  "👩🏿‍🚀",
  "👩🏿‍🚒",
  "👩🏿‍🦯",
  "👩🏿‍🦼",
  "👩🏿‍🦽",
  "🧑‍⚕️",
  "🧑‍⚖️",
  "🧑‍✈️",
  "🧑‍🌾",
  "🧑‍🍳",
  "🧑‍🍼",
  "🧑‍🎓",
  "🧑‍🎤",
  "🧑‍🎨",
  "🧑‍🏫",
  "🧑‍🏭",
  "🧑‍💻",
  "🧑‍💼",
  "🧑‍🔧",
  "🧑‍🔬",
  "🧑‍🚀",
  "🧑‍🚒",
  "🧑‍🦯",
  "🧑‍🦼",
  "🧑‍🦽",
  "🧑🏻‍⚕️",
  "🧑🏻‍⚖️",
  "🧑🏻‍✈️",
  "🧑🏻‍🌾",
  "🧑🏻‍🍳",
  "🧑🏻‍🍼",
  "🧑🏻‍🎓",
  "🧑🏻‍🎤",
  "🧑🏻‍🎨",
  "🧑🏻‍🏫",
  "🧑🏻‍🏭",
  "🧑🏻‍💻",
  "🧑🏻‍💼",
  "🧑🏻‍🔧",
  "🧑🏻‍🔬",
  "🧑🏻‍🚀",
  "🧑🏻‍🚒",
  "🧑🏻‍🦯",
  "🧑🏻‍🦼",
  "🧑🏻‍🦽",
  "🧑🏼‍⚕️",
  "🧑🏼‍⚖️",
  "🧑🏼‍✈️",
  "🧑🏼‍🌾",
  "🧑🏼‍🍳",
  "🧑🏼‍🍼",
  "🧑🏼‍🎓",
  "🧑🏼‍🎤",
  "🧑🏼‍🎨",
  "🧑🏼‍🏫",
  "🧑🏼‍🏭",
  "🧑🏼‍💻",
  "🧑🏼‍💼",
  "🧑🏼‍🔧",
  "🧑🏼‍🔬",
  "🧑🏼‍🚀",
  "🧑🏼‍🚒",
  "🧑🏼‍🦯",
  "🧑🏼‍🦼",
  "🧑🏼‍🦽",
  "🧑🏽‍⚕️",
  "🧑🏽‍⚖️",
  "🧑🏽‍✈️",
  "🧑🏽‍🌾",
  "🧑🏽‍🍳",
  "🧑🏽‍🍼",
  "🧑🏽‍🎓",
  "🧑🏽‍🎤",
  "🧑🏽‍🎨",
  "🧑🏽‍🏫",
  "🧑🏽‍🏭",
  "🧑🏽‍💻",
  "🧑🏽‍💼",
  "🧑🏽‍🔧",
  "🧑🏽‍🔬",
  "🧑🏽‍🚀",
  "🧑🏽‍🚒",
  "🧑🏽‍🦯",
  "🧑🏽‍🦼",
  "🧑🏽‍🦽",
  "🧑🏾‍⚕️",
  "🧑🏾‍⚖️",
  "🧑🏾‍✈️",
  "🧑🏾‍🌾",
  "🧑🏾‍🍳",
  "🧑🏾‍🍼",
  "🧑🏾‍🎓",
  "🧑🏾‍🎤",
  "🧑🏾‍🎨",
  "🧑🏾‍🏫",
  "🧑🏾‍🏭",
  "🧑🏾‍💻",
  "🧑🏾‍💼",
  "🧑🏾‍🔧",
  "🧑🏾‍🔬",
  "🧑🏾‍🚀",
  "🧑🏾‍🚒",
  "🧑🏾‍🦯",
  "🧑🏾‍🦼",
  "🧑🏾‍🦽",
  "🧑🏿‍⚕️",
  "🧑🏿‍⚖️",
  "🧑🏿‍✈️",
  "🧑🏿‍🌾",
  "🧑🏿‍🍳",
  "🧑🏿‍🍼",
  "🧑🏿‍🎓",
  "🧑🏿‍🎤",
  "🧑🏿‍🎨",
  "🧑🏿‍🏫",
  "🧑🏿‍🏭",
  "🧑🏿‍💻",
  "🧑🏿‍💼",
  "🧑🏿‍🔧",
  "🧑🏿‍🔬",
  "🧑🏿‍🚀",
  "🧑🏿‍🚒",
  "🧑🏿‍🦯",
  "🧑🏿‍🦼",
  "🧑🏿‍🦽",
  "⛹🏻‍♀️",
  "⛹🏻‍♂️",
  "⛹🏼‍♀️",
  "⛹🏼‍♂️",
  "⛹🏽‍♀️",
  "⛹🏽‍♂️",
  "⛹🏾‍♀️",
  "⛹🏾‍♂️",
  "⛹🏿‍♀️",
  "⛹🏿‍♂️",
  "⛹️‍♀️",
  "⛹️‍♂️",
  "🏃‍♀️",
  "🏃‍♂️",
  "🏃🏻‍♀️",
  "🏃🏻‍♂️",
  "🏃🏼‍♀️",
  "🏃🏼‍♂️",
  "🏃🏽‍♀️",
  "🏃🏽‍♂️",
  "🏃🏾‍♀️",
  "🏃🏾‍♂️",
  "🏃🏿‍♀️",
  "🏃🏿‍♂️",
  "🏄‍♀️",
  "🏄‍♂️",
  "🏄🏻‍♀️",
  "🏄🏻‍♂️",
  "🏄🏼‍♀️",
  "🏄🏼‍♂️",
  "🏄🏽‍♀️",
  "🏄🏽‍♂️",
  "🏄🏾‍♀️",
  "🏄🏾‍♂️",
  "🏄🏿‍♀️",
  "🏄🏿‍♂️",
  "🏊‍♀️",
  "🏊‍♂️",
  "🏊🏻‍♀️",
  "🏊🏻‍♂️",
  "🏊🏼‍♀️",
  "🏊🏼‍♂️",
  "🏊🏽‍♀️",
  "🏊🏽‍♂️",
  "🏊🏾‍♀️",
  "🏊🏾‍♂️",
  "🏊🏿‍♀️",
  "🏊🏿‍♂️",
  "🏋🏻‍♀️",
  "🏋🏻‍♂️",
  "🏋🏼‍♀️",
  "🏋🏼‍♂️",
  "🏋🏽‍♀️",
  "🏋🏽‍♂️",
  "🏋🏾‍♀️",
  "🏋🏾‍♂️",
  "🏋🏿‍♀️",
  "🏋🏿‍♂️",
  "🏋️‍♀️",
  "🏋️‍♂️",
  "🏌🏻‍♀️",
  "🏌🏻‍♂️",
  "🏌🏼‍♀️",
  "🏌🏼‍♂️",
  "🏌🏽‍♀️",
  "🏌🏽‍♂️",
  "🏌🏾‍♀️",
  "🏌🏾‍♂️",
  "🏌🏿‍♀️",
  "🏌🏿‍♂️",
  "🏌️‍♀️",
  "🏌️‍♂️",
  "👮‍♀️",
  "👮‍♂️",
  "👮🏻‍♀️",
  "👮🏻‍♂️",
  "👮🏼‍♀️",
  "👮🏼‍♂️",
  "👮🏽‍♀️",
  "👮🏽‍♂️",
  "👮🏾‍♀️",
  "👮🏾‍♂️",
  "👮🏿‍♀️",
  "👮🏿‍♂️",
  "👯‍♀️",
  "👯‍♂️",
  "👰‍♀️",
  "👰‍♂️",
  "👰🏻‍♀️",
  "👰🏻‍♂️",
  "👰🏼‍♀️",
  "👰🏼‍♂️",
  "👰🏽‍♀️",
  "👰🏽‍♂️",
  "👰🏾‍♀️",
  "👰🏾‍♂️",
  "👰🏿‍♀️",
  "👰🏿‍♂️",
  "👱‍♀️",
  "👱‍♂️",
  "👱🏻‍♀️",
  "👱🏻‍♂️",
  "👱🏼‍♀️",
  "👱🏼‍♂️",
  "👱🏽‍♀️",
  "👱🏽‍♂️",
  "👱🏾‍♀️",
  "👱🏾‍♂️",
  "👱🏿‍♀️",
  "👱🏿‍♂️",
  "👳‍♀️",
  "👳‍♂️",
  "👳🏻‍♀️",
  "👳🏻‍♂️",
  "👳🏼‍♀️",
  "👳🏼‍♂️",
  "👳🏽‍♀️",
  "👳🏽‍♂️",
  "👳🏾‍♀️",
  "👳🏾‍♂️",
  "👳🏿‍♀️",
  "👳🏿‍♂️",
  "👷‍♀️",
  "👷‍♂️",
  "👷🏻‍♀️",
  "👷🏻‍♂️",
  "👷🏼‍♀️",
  "👷🏼‍♂️",
  "👷🏽‍♀️",
  "👷🏽‍♂️",
  "👷🏾‍♀️",
  "👷🏾‍♂️",
  "👷🏿‍♀️",
  "👷🏿‍♂️",
  "💁‍♀️",
  "💁‍♂️",
  "💁🏻‍♀️",
  "💁🏻‍♂️",
  "💁🏼‍♀️",
  "💁🏼‍♂️",
  "💁🏽‍♀️",
  "💁🏽‍♂️",
  "💁🏾‍♀️",
  "💁🏾‍♂️",
  "💁🏿‍♀️",
  "💁🏿‍♂️",
  "💂‍♀️",
  "💂‍♂️",
  "💂🏻‍♀️",
  "💂🏻‍♂️",
  "💂🏼‍♀️",
  "💂🏼‍♂️",
  "💂🏽‍♀️",
  "💂🏽‍♂️",
  "💂🏾‍♀️",
  "💂🏾‍♂️",
  "💂🏿‍♀️",
  "💂🏿‍♂️",
  "💆‍♀️",
  "💆‍♂️",
  "💆🏻‍♀️",
  "💆🏻‍♂️",
  "💆🏼‍♀️",
  "💆🏼‍♂️",
  "💆🏽‍♀️",
  "💆🏽‍♂️",
  "💆🏾‍♀️",
  "💆🏾‍♂️",
  "💆🏿‍♀️",
  "💆🏿‍♂️",
  "💇‍♀️",
  "💇‍♂️",
  "💇🏻‍♀️",
  "💇🏻‍♂️",
  "💇🏼‍♀️",
  "💇🏼‍♂️",
  "💇🏽‍♀️",
  "💇🏽‍♂️",
  "💇🏾‍♀️",
  "💇🏾‍♂️",
  "💇🏿‍♀️",
  "💇🏿‍♂️",
  "🕵🏻‍♀️",
  "🕵🏻‍♂️",
  "🕵🏼‍♀️",
  "🕵🏼‍♂️",
  "🕵🏽‍♀️",
  "🕵🏽‍♂️",
  "🕵🏾‍♀️",
  "🕵🏾‍♂️",
  "🕵🏿‍♀️",
  "🕵🏿‍♂️",
  "🕵️‍♀️",
  "🕵️‍♂️",
  "🙅‍♀️",
  "🙅‍♂️",
  "🙅🏻‍♀️",
  "🙅🏻‍♂️",
  "🙅🏼‍♀️",
  "🙅🏼‍♂️",
  "🙅🏽‍♀️",
  "🙅🏽‍♂️",
  "🙅🏾‍♀️",
  "🙅🏾‍♂️",
  "🙅🏿‍♀️",
  "🙅🏿‍♂️",
  "🙆‍♀️",
  "🙆‍♂️",
  "🙆🏻‍♀️",
  "🙆🏻‍♂️",
  "🙆🏼‍♀️",
  "🙆🏼‍♂️",
  "🙆🏽‍♀️",
  "🙆🏽‍♂️",
  "🙆🏾‍♀️",
  "🙆🏾‍♂️",
  "🙆🏿‍♀️",
  "🙆🏿‍♂️",
  "🙇‍♀️",
  "🙇‍♂️",
  "🙇🏻‍♀️",
  "🙇🏻‍♂️",
  "🙇🏼‍♀️",
  "🙇🏼‍♂️",
  "🙇🏽‍♀️",
  "🙇🏽‍♂️",
  "🙇🏾‍♀️",
  "🙇🏾‍♂️",
  "🙇🏿‍♀️",
  "🙇🏿‍♂️",
  "🙋‍♀️",
  "🙋‍♂️",
  "🙋🏻‍♀️",
  "🙋🏻‍♂️",
  "🙋🏼‍♀️",
  "🙋🏼‍♂️",
  "🙋🏽‍♀️",
  "🙋🏽‍♂️",
  "🙋🏾‍♀️",
  "🙋🏾‍♂️",
  "🙋🏿‍♀️",
  "🙋🏿‍♂️",
  "🙍‍♀️",
  "🙍‍♂️",
  "🙍🏻‍♀️",
  "🙍🏻‍♂️",
  "🙍🏼‍♀️",
  "🙍🏼‍♂️",
  "🙍🏽‍♀️",
  "🙍🏽‍♂️",
  "🙍🏾‍♀️",
  "🙍🏾‍♂️",
  "🙍🏿‍♀️",
  "🙍🏿‍♂️",
  "🙎‍♀️",
  "🙎‍♂️",
  "🙎🏻‍♀️",
  "🙎🏻‍♂️",
  "🙎🏼‍♀️",
  "🙎🏼‍♂️",
  "🙎🏽‍♀️",
  "🙎🏽‍♂️",
  "🙎🏾‍♀️",
  "🙎🏾‍♂️",
  "🙎🏿‍♀️",
  "🙎🏿‍♂️",
  "🚣‍♀️",
  "🚣‍♂️",
  "🚣🏻‍♀️",
  "🚣🏻‍♂️",
  "🚣🏼‍♀️",
  "🚣🏼‍♂️",
  "🚣🏽‍♀️",
  "🚣🏽‍♂️",
  "🚣🏾‍♀️",
  "🚣🏾‍♂️",
  "🚣🏿‍♀️",
  "🚣🏿‍♂️",
  "🚴‍♀️",
  "🚴‍♂️",
  "🚴🏻‍♀️",
  "🚴🏻‍♂️",
  "🚴🏼‍♀️",
  "🚴🏼‍♂️",
  "🚴🏽‍♀️",
  "🚴🏽‍♂️",
  "🚴🏾‍♀️",
  "🚴🏾‍♂️",
  "🚴🏿‍♀️",
  "🚴🏿‍♂️",
  "🚵‍♀️",
  "🚵‍♂️",
  "🚵🏻‍♀️",
  "🚵🏻‍♂️",
  "🚵🏼‍♀️",
  "🚵🏼‍♂️",
  "🚵🏽‍♀️",
  "🚵🏽‍♂️",
  "🚵🏾‍♀️",
  "🚵🏾‍♂️",
  "🚵🏿‍♀️",
  "🚵🏿‍♂️",
  "🚶‍♀️",
  "🚶‍♂️",
  "🚶🏻‍♀️",
  "🚶🏻‍♂️",
  "🚶🏼‍♀️",
  "🚶🏼‍♂️",
  "🚶🏽‍♀️",
  "🚶🏽‍♂️",
  "🚶🏾‍♀️",
  "🚶🏾‍♂️",
  "🚶🏿‍♀️",
  "🚶🏿‍♂️",
  "🤦‍♀️",
  "🤦‍♂️",
  "🤦🏻‍♀️",
  "🤦🏻‍♂️",
  "🤦🏼‍♀️",
  "🤦🏼‍♂️",
  "🤦🏽‍♀️",
  "🤦🏽‍♂️",
  "🤦🏾‍♀️",
  "🤦🏾‍♂️",
  "🤦🏿‍♀️",
  "🤦🏿‍♂️",
  "🤵‍♀️",
  "🤵‍♂️",
  "🤵🏻‍♀️",
  "🤵🏻‍♂️",
  "🤵🏼‍♀️",
  "🤵🏼‍♂️",
  "🤵🏽‍♀️",
  "🤵🏽‍♂️",
  "🤵🏾‍♀️",
  "🤵🏾‍♂️",
  "🤵🏿‍♀️",
  "🤵🏿‍♂️",
  "🤷‍♀️",
  "🤷‍♂️",
  "🤷🏻‍♀️",
  "🤷🏻‍♂️",
  "🤷🏼‍♀️",
  "🤷🏼‍♂️",
  "🤷🏽‍♀️",
  "🤷🏽‍♂️",
  "🤷🏾‍♀️",
  "🤷🏾‍♂️",
  "🤷🏿‍♀️",
  "🤷🏿‍♂️",
  "🤸‍♀️",
  "🤸‍♂️",
  "🤸🏻‍♀️",
  "🤸🏻‍♂️",
  "🤸🏼‍♀️",
  "🤸🏼‍♂️",
  "🤸🏽‍♀️",
  "🤸🏽‍♂️",
  "🤸🏾‍♀️",
  "🤸🏾‍♂️",
  "🤸🏿‍♀️",
  "🤸🏿‍♂️",
  "🤹‍♀️",
  "🤹‍♂️",
  "🤹🏻‍♀️",
  "🤹🏻‍♂️",
  "🤹🏼‍♀️",
  "🤹🏼‍♂️",
  "🤹🏽‍♀️",
  "🤹🏽‍♂️",
  "🤹🏾‍♀️",
  "🤹🏾‍♂️",
  "🤹🏿‍♀️",
  "🤹🏿‍♂️",
  "🤼‍♀️",
  "🤼‍♂️",
  "🤽‍♀️",
  "🤽‍♂️",
  "🤽🏻‍♀️",
  "🤽🏻‍♂️",
  "🤽🏼‍♀️",
  "🤽🏼‍♂️",
  "🤽🏽‍♀️",
  "🤽🏽‍♂️",
  "🤽🏾‍♀️",
  "🤽🏾‍♂️",
  "🤽🏿‍♀️",
  "🤽🏿‍♂️",
  "🤾‍♀️",
  "🤾‍♂️",
  "🤾🏻‍♀️",
  "🤾🏻‍♂️",
  "🤾🏼‍♀️",
  "🤾🏼‍♂️",
  "🤾🏽‍♀️",
  "🤾🏽‍♂️",
  "🤾🏾‍♀️",
  "🤾🏾‍♂️",
  "🤾🏿‍♀️",
  "🤾🏿‍♂️",
  "🦸‍♀️",
  "🦸‍♂️",
  "🦸🏻‍♀️",
  "🦸🏻‍♂️",
  "🦸🏼‍♀️",
  "🦸🏼‍♂️",
  "🦸🏽‍♀️",
  "🦸🏽‍♂️",
  "🦸🏾‍♀️",
  "🦸🏾‍♂️",
  "🦸🏿‍♀️",
  "🦸🏿‍♂️",
  "🦹‍♀️",
  "🦹‍♂️",
  "🦹🏻‍♀️",
  "🦹🏻‍♂️",
  "🦹🏼‍♀️",
  "🦹🏼‍♂️",
  "🦹🏽‍♀️",
  "🦹🏽‍♂️",
  "🦹🏾‍♀️",
  "🦹🏾‍♂️",
  "🦹🏿‍♀️",
  "🦹🏿‍♂️",
  "🧍‍♀️",
  "🧍‍♂️",
  "🧍🏻‍♀️",
  "🧍🏻‍♂️",
  "🧍🏼‍♀️",
  "🧍🏼‍♂️",
  "🧍🏽‍♀️",
  "🧍🏽‍♂️",
  "🧍🏾‍♀️",
  "🧍🏾‍♂️",
  "🧍🏿‍♀️",
  "🧍🏿‍♂️",
  "🧎‍♀️",
  "🧎‍♂️",
  "🧎🏻‍♀️",
  "🧎🏻‍♂️",
  "🧎🏼‍♀️",
  "🧎🏼‍♂️",
  "🧎🏽‍♀️",
  "🧎🏽‍♂️",
  "🧎🏾‍♀️",
  "🧎🏾‍♂️",
  "🧎🏿‍♀️",
  "🧎🏿‍♂️",
  "🧏‍♀️",
  "🧏‍♂️",
  "🧏🏻‍♀️",
  "🧏🏻‍♂️",
  "🧏🏼‍♀️",
  "🧏🏼‍♂️",
  "🧏🏽‍♀️",
  "🧏🏽‍♂️",
  "🧏🏾‍♀️",
  "🧏🏾‍♂️",
  "🧏🏿‍♀️",
  "🧏🏿‍♂️",
  "🧔‍♀️",
  "🧔‍♂️",
  "🧔🏻‍♀️",
  "🧔🏻‍♂️",
  "🧔🏼‍♀️",
  "🧔🏼‍♂️",
  "🧔🏽‍♀️",
  "🧔🏽‍♂️",
  "🧔🏾‍♀️",
  "🧔🏾‍♂️",
  "🧔🏿‍♀️",
  "🧔🏿‍♂️",
  "🧖‍♀️",
  "🧖‍♂️",
  "🧖🏻‍♀️",
  "🧖🏻‍♂️",
  "🧖🏼‍♀️",
  "🧖🏼‍♂️",
  "🧖🏽‍♀️",
  "🧖🏽‍♂️",
  "🧖🏾‍♀️",
  "🧖🏾‍♂️",
  "🧖🏿‍♀️",
  "🧖🏿‍♂️",
  "🧗‍♀️",
  "🧗‍♂️",
  "🧗🏻‍♀️",
  "🧗🏻‍♂️",
  "🧗🏼‍♀️",
  "🧗🏼‍♂️",
  "🧗🏽‍♀️",
  "🧗🏽‍♂️",
  "🧗🏾‍♀️",
  "🧗🏾‍♂️",
  "🧗🏿‍♀️",
  "🧗🏿‍♂️",
  "🧘‍♀️",
  "🧘‍♂️",
  "🧘🏻‍♀️",
  "🧘🏻‍♂️",
  "🧘🏼‍♀️",
  "🧘🏼‍♂️",
  "🧘🏽‍♀️",
  "🧘🏽‍♂️",
  "🧘🏾‍♀️",
  "🧘🏾‍♂️",
  "🧘🏿‍♀️",
  "🧘🏿‍♂️",
  "🧙‍♀️",
  "🧙‍♂️",
  "🧙🏻‍♀️",
  "🧙🏻‍♂️",
  "🧙🏼‍♀️",
  "🧙🏼‍♂️",
  "🧙🏽‍♀️",
  "🧙🏽‍♂️",
  "🧙🏾‍♀️",
  "🧙🏾‍♂️",
  "🧙🏿‍♀️",
  "🧙🏿‍♂️",
  "🧚‍♀️",
  "🧚‍♂️",
  "🧚🏻‍♀️",
  "🧚🏻‍♂️",
  "🧚🏼‍♀️",
  "🧚🏼‍♂️",
  "🧚🏽‍♀️",
  "🧚🏽‍♂️",
  "🧚🏾‍♀️",
  "🧚🏾‍♂️",
  "🧚🏿‍♀️",
  "🧚🏿‍♂️",
  "🧛‍♀️",
  "🧛‍♂️",
  "🧛🏻‍♀️",
  "🧛🏻‍♂️",
  "🧛🏼‍♀️",
  "🧛🏼‍♂️",
  "🧛🏽‍♀️",
  "🧛🏽‍♂️",
  "🧛🏾‍♀️",
  "🧛🏾‍♂️",
  "🧛🏿‍♀️",
  "🧛🏿‍♂️",
  "🧜‍♀️",
  "🧜‍♂️",
  "🧜🏻‍♀️",
  "🧜🏻‍♂️",
  "🧜🏼‍♀️",
  "🧜🏼‍♂️",
  "🧜🏽‍♀️",
  "🧜🏽‍♂️",
  "🧜🏾‍♀️",
  "🧜🏾‍♂️",
  "🧜🏿‍♀️",
  "🧜🏿‍♂️",
  "🧝‍♀️",
  "🧝‍♂️",
  "🧝🏻‍♀️",
  "🧝🏻‍♂️",
  "🧝🏼‍♀️",
  "🧝🏼‍♂️",
  "🧝🏽‍♀️",
  "🧝🏽‍♂️",
  "🧝🏾‍♀️",
  "🧝🏾‍♂️",
  "🧝🏿‍♀️",
  "🧝🏿‍♂️",
  "🧞‍♀️",
  "🧞‍♂️",
  "🧟‍♀️",
  "🧟‍♂️",
  "👨‍🦰",
  "👨‍🦱",
  "👨‍🦲",
  "👨‍🦳",
  "👨🏻‍🦰",
  "👨🏻‍🦱",
  "👨🏻‍🦲",
  "👨🏻‍🦳",
  "👨🏼‍🦰",
  "👨🏼‍🦱",
  "👨🏼‍🦲",
  "👨🏼‍🦳",
  "👨🏽‍🦰",
  "👨🏽‍🦱",
  "👨🏽‍🦲",
  "👨🏽‍🦳",
  "👨🏾‍🦰",
  "👨🏾‍🦱",
  "👨🏾‍🦲",
  "👨🏾‍🦳",
  "👨🏿‍🦰",
  "👨🏿‍🦱",
  "👨🏿‍🦲",
  "👨🏿‍🦳",
  "👩‍🦰",
  "👩‍🦱",
  "👩‍🦲",
  "👩‍🦳",
  "👩🏻‍🦰",
  "👩🏻‍🦱",
  "👩🏻‍🦲",
  "👩🏻‍🦳",
  "👩🏼‍🦰",
  "👩🏼‍🦱",
  "👩🏼‍🦲",
  "👩🏼‍🦳",
  "👩🏽‍🦰",
  "👩🏽‍🦱",
  "👩🏽‍🦲",
  "👩🏽‍🦳",
  "👩🏾‍🦰",
  "👩🏾‍🦱",
  "👩🏾‍🦲",
  "👩🏾‍🦳",
  "👩🏿‍🦰",
  "👩🏿‍🦱",
  "👩🏿‍🦲",
  "👩🏿‍🦳",
  "🧑‍🦰",
  "🧑‍🦱",
  "🧑‍🦲",
  "🧑‍🦳",
  "🧑🏻‍🦰",
  "🧑🏻‍🦱",
  "🧑🏻‍🦲",
  "🧑🏻‍🦳",
  "🧑🏼‍🦰",
  "🧑🏼‍🦱",
  "🧑🏼‍🦲",
  "🧑🏼‍🦳",
  "🧑🏽‍🦰",
  "🧑🏽‍🦱",
  "🧑🏽‍🦲",
  "🧑🏽‍🦳",
  "🧑🏾‍🦰",
  "🧑🏾‍🦱",
  "🧑🏾‍🦲",
  "🧑🏾‍🦳",
  "🧑🏿‍🦰",
  "🧑🏿‍🦱",
  "🧑🏿‍🦲",
  "🧑🏿‍🦳",
];

export const randomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const randomPersonEmoji = () => {
  return personEmojis[Math.floor(Math.random() * personEmojis.length)];
};