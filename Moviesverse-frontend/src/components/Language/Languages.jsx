import React, { useEffect, useState } from 'react'

function Languages({ Language }) {

    const lang = [
        {
            "shortcut": "an",
            "english_name": "Aragonese",
            "name": ""
        },
        {
            "shortcut": "ak",
            "english_name": "Akan",
            "name": ""
        },
        {
            "shortcut": "cr",
            "english_name": "Cree",
            "name": ""
        },
        {
            "shortcut": "az",
            "english_name": "Azerbaijani",
            "name": "Azərbaycan"
        },
        {
            "shortcut": "cs",
            "english_name": "Czech",
            "name": "Český"
        },
        {
            "shortcut": "aa",
            "english_name": "Afar",
            "name": ""
        },
        {
            "shortcut": "br",
            "english_name": "Breton",
            "name": ""
        },
        {
            "shortcut": "af",
            "english_name": "Afrikaans",
            "name": "Afrikaans"
        },
        {
            "shortcut": "bo",
            "english_name": "Tibetan",
            "name": ""
        },
        {
            "shortcut": "ce",
            "english_name": "Chechen",
            "name": ""
        },
        {
            "shortcut": "kw",
            "english_name": "Cornish",
            "name": ""
        },
        {
            "shortcut": "fo",
            "english_name": "Faroese",
            "name": ""
        },
        {
            "shortcut": "la",
            "english_name": "Latin",
            "name": "Latin"
        },
        {
            "shortcut": "ng",
            "english_name": "Ndonga",
            "name": ""
        },
        {
            "shortcut": "sc",
            "english_name": "Sardinian",
            "name": ""
        },
        {
            "shortcut": "ti",
            "english_name": "Tigrinya",
            "name": ""
        },
        {
            "shortcut": "tn",
            "english_name": "Tswana",
            "name": ""
        },
        {
            "shortcut": "tr",
            "english_name": "Turkish",
            "name": "Türkçe"
        },
        {
            "shortcut": "pa",
            "english_name": "Punjabi",
            "name": "ਪੰਜਾਬੀ"
        },
        {
            "shortcut": "et",
            "english_name": "Estonian",
            "name": "Eesti"
        },
        {
            "shortcut": "fr",
            "english_name": "French",
            "name": "Français"
        },
        {
            "shortcut": "ha",
            "english_name": "Hausa",
            "name": "Hausa"
        },
        {
            "shortcut": "is",
            "english_name": "Icelandic",
            "name": "Íslenska"
        },
        {
            "shortcut": "li",
            "english_name": "Limburgish",
            "name": ""
        },
        {
            "shortcut": "ln",
            "english_name": "Lingala",
            "name": ""
        },
        {
            "shortcut": "ss",
            "english_name": "Swati",
            "name": ""
        },
        {
            "shortcut": "ab",
            "english_name": "Abkhazian",
            "name": ""
        },
        {
            "shortcut": "sh",
            "english_name": "Serbo-Croatian",
            "name": ""
        },
        {
            "shortcut": "eu",
            "english_name": "Basque",
            "name": "euskera"
        },
        {
            "shortcut": "fy",
            "english_name": "Frisian",
            "name": ""
        },
        {
            "shortcut": "ja",
            "english_name": "Japanese",
            "name": "日本語"
        },
        {
            "shortcut": "oj",
            "english_name": "Ojibwa",
            "name": ""
        },
        {
            "shortcut": "or",
            "english_name": "Oriya",
            "name": ""
        },
        {
            "shortcut": "pi",
            "english_name": "Pali",
            "name": ""
        },
        {
            "shortcut": "su",
            "english_name": "Sundanese",
            "name": ""
        },
        {
            "shortcut": "th",
            "english_name": "Thai",
            "name": "ภาษาไทย"
        },
        {
            "shortcut": "ig",
            "english_name": "Igbo",
            "name": ""
        },
        {
            "shortcut": "id",
            "english_name": "Indonesian",
            "name": "Bahasa indonesia"
        },
        {
            "shortcut": "kk",
            "english_name": "Kazakh",
            "name": "қазақ"
        },
        {
            "shortcut": "ki",
            "english_name": "Kikuyu",
            "name": ""
        },
        {
            "shortcut": "ug",
            "english_name": "Uighur",
            "name": ""
        },
        {
            "shortcut": "ve",
            "english_name": "Venda",
            "name": ""
        },
        {
            "shortcut": "rw",
            "english_name": "Kinyarwanda",
            "name": "Kinyarwanda"
        },
        {
            "shortcut": "mi",
            "english_name": "Maori",
            "name": ""
        },
        {
            "shortcut": "nv",
            "english_name": "Navajo",
            "name": ""
        },
        {
            "shortcut": "hi",
            "english_name": "Hindi",
            "name": "हिन्दी"
        },
        {
            "shortcut": "pt",
            "english_name": "Portuguese",
            "name": "Português"
        },
        {
            "shortcut": "sg",
            "english_name": "Sango",
            "name": ""
        },
        {
            "shortcut": "sk",
            "english_name": "Slovak",
            "name": "Slovenčina"
        },
        {
            "shortcut": "sr",
            "english_name": "Serbian",
            "name": "Srpski"
        },
        {
            "shortcut": "ty",
            "english_name": "Tahitian",
            "name": ""
        },
        {
            "shortcut": "xh",
            "english_name": "Xhosa",
            "name": ""
        },
        {
            "shortcut": "ar",
            "english_name": "Arabic",
            "name": "العربية"
        },
        {
            "shortcut": "co",
            "english_name": "Corsican",
            "name": ""
        },
        {
            "shortcut": "bi",
            "english_name": "Bislama",
            "name": ""
        },
        {
            "shortcut": "eo",
            "english_name": "Esperanto",
            "name": "Esperanto"
        },
        {
            "shortcut": "hz",
            "english_name": "Herero",
            "name": ""
        },
        {
            "shortcut": "fi",
            "english_name": "Finnish",
            "name": "suomi"
        },
        {
            "shortcut": "iu",
            "english_name": "Inuktitut",
            "name": ""
        },
        {
            "shortcut": "lv",
            "english_name": "Latvian",
            "name": "Latviešu"
        },
        {
            "shortcut": "it",
            "english_name": "Italian",
            "name": "Italiano"
        },
        {
            "shortcut": "nl",
            "english_name": "Dutch",
            "name": "Nederlands"
        },
        {
            "shortcut": "kn",
            "english_name": "Kannada",
            "name": "?????"
        },
        {
            "shortcut": "sa",
            "english_name": "Sanskrit",
            "name": ""
        },
        {
            "shortcut": "sq",
            "english_name": "Albanian",
            "name": "shqip"
        },
        {
            "shortcut": "tl",
            "english_name": "Tagalog",
            "name": ""
        },
        {
            "shortcut": "lb",
            "english_name": "Letzeburgesch",
            "name": ""
        },
        {
            "shortcut": "ts",
            "english_name": "Tsonga",
            "name": ""
        },
        {
            "shortcut": "ml",
            "english_name": "Malayalam",
            "name": ""
        },
        {
            "shortcut": "vo",
            "english_name": "Volapük",
            "name": ""
        },
        {
            "shortcut": "zu",
            "english_name": "Zulu",
            "name": "isiZulu"
        },
        {
            "shortcut": "os",
            "english_name": "Ossetian; Ossetic",
            "name": ""
        },
        {
            "shortcut": "sm",
            "english_name": "Samoan",
            "name": ""
        },
        {
            "shortcut": "za",
            "english_name": "Zhuang",
            "name": ""
        },
        {
            "shortcut": "bn",
            "english_name": "Bengali",
            "name": "বাংলা"
        },
        {
            "shortcut": "cu",
            "english_name": "Slavic",
            "name": ""
        },
        {
            "shortcut": "ga",
            "english_name": "Irish",
            "name": "Gaeilge"
        },
        {
            "shortcut": "gv",
            "english_name": "Manx",
            "name": ""
        },
        {
            "shortcut": "hu",
            "english_name": "Hungarian",
            "name": "Magyar"
        },
        {
            "shortcut": "jv",
            "english_name": "Javanese",
            "name": ""
        },
        {
            "shortcut": "kr",
            "english_name": "Kanuri",
            "name": ""
        },
        {
            "shortcut": "km",
            "english_name": "Khmer",
            "name": ""
        },
        {
            "shortcut": "ky",
            "english_name": "Kirghiz",
            "name": "??????"
        },
        {
            "shortcut": "na",
            "english_name": "Nauru",
            "name": ""
        },
        {
            "shortcut": "nr",
            "english_name": "Ndebele",
            "name": ""
        },
        {
            "shortcut": "oc",
            "english_name": "Occitan",
            "name": ""
        },
        {
            "shortcut": "ro",
            "english_name": "Romanian",
            "name": "Română"
        },
        {
            "shortcut": "ru",
            "english_name": "Russian",
            "name": "Pусский"
        },
        {
            "shortcut": "hy",
            "english_name": "Armenian",
            "name": ""
        },
        {
            "shortcut": "ch",
            "english_name": "Chamorro",
            "name": "Finu' Chamorro"
        },
        {
            "shortcut": "xx",
            "english_name": "No Language",
            "name": "No Language"
        },
        {
            "shortcut": "ba",
            "english_name": "Bashkir",
            "name": ""
        },
        {
            "shortcut": "gl",
            "english_name": "Galician",
            "name": "Galego"
        },
        {
            "shortcut": "io",
            "english_name": "Ido",
            "name": ""
        },
        {
            "shortcut": "lu",
            "english_name": "Luba-Katanga",
            "name": ""
        },
        {
            "shortcut": "mh",
            "english_name": "Marshall",
            "name": ""
        },
        {
            "shortcut": "mg",
            "english_name": "Malagasy",
            "name": ""
        },
        {
            "shortcut": "mo",
            "english_name": "Moldavian",
            "name": ""
        },
        {
            "shortcut": "mn",
            "english_name": "Mongolian",
            "name": ""
        },
        {
            "shortcut": "nd",
            "english_name": "Ndebele",
            "name": ""
        },
        {
            "shortcut": "no",
            "english_name": "Norwegian",
            "name": "Norsk"
        },
        {
            "shortcut": "pl",
            "english_name": "Polish",
            "name": "Polski"
        },
        {
            "shortcut": "sw",
            "english_name": "Swahili",
            "name": "Kiswahili"
        },
        {
            "shortcut": "tg",
            "english_name": "Tajik",
            "name": ""
        },
        {
            "shortcut": "to",
            "english_name": "Tonga",
            "name": ""
        },
        {
            "shortcut": "wa",
            "english_name": "Walloon",
            "name": ""
        },
        {
            "shortcut": "yi",
            "english_name": "Yiddish",
            "name": ""
        },
        {
            "shortcut": "en",
            "english_name": "English",
            "name": "English"
        },
        {
            "shortcut": "as",
            "english_name": "Assamese",
            "name": ""
        },
        {
            "shortcut": "gd",
            "english_name": "Gaelic",
            "name": ""
        },
        {
            "shortcut": "kl",
            "english_name": "Kalaallisut",
            "name": ""
        },
        {
            "shortcut": "my",
            "english_name": "Burmese",
            "name": ""
        },
        {
            "shortcut": "qu",
            "english_name": "Quechua",
            "name": ""
        },
        {
            "shortcut": "sn",
            "english_name": "Shona",
            "name": ""
        },
        {
            "shortcut": "uk",
            "english_name": "Ukrainian",
            "name": "Український"
        },
        {
            "shortcut": "fa",
            "english_name": "Persian",
            "name": "فارسی"
        },
        {
            "shortcut": "ka",
            "english_name": "Georgian",
            "name": "ქართული"
        },
        {
            "shortcut": "gu",
            "english_name": "Gujarati",
            "name": ""
        },
        {
            "shortcut": "av",
            "english_name": "Avaric",
            "name": ""
        },
        {
            "shortcut": "ae",
            "english_name": "Avestan",
            "name": ""
        },
        {
            "shortcut": "gn",
            "english_name": "Guarani",
            "name": ""
        },
        {
            "shortcut": "mt",
            "english_name": "Maltese",
            "name": "Malti"
        },
        {
            "shortcut": "ne",
            "english_name": "Nepali",
            "name": ""
        },
        {
            "shortcut": "sv",
            "english_name": "Swedish",
            "name": "svenska"
        },
        {
            "shortcut": "tt",
            "english_name": "Tatar",
            "name": ""
        },
        {
            "shortcut": "wo",
            "english_name": "Wolof",
            "name": "Wolof"
        },
        {
            "shortcut": "cn",
            "english_name": "Cantonese",
            "name": "广州话 / 廣州話"
        },
        {
            "shortcut": "cv",
            "english_name": "Chuvash",
            "name": ""
        },
        {
            "shortcut": "da",
            "english_name": "Danish",
            "name": "Dansk"
        },
        {
            "shortcut": "dz",
            "english_name": "Dzongkha",
            "name": ""
        },
        {
            "shortcut": "ny",
            "english_name": "Chichewa; Nyanja",
            "name": ""
        },
        {
            "shortcut": "rn",
            "english_name": "Rundi",
            "name": "Kirundi"
        },
        {
            "shortcut": "st",
            "english_name": "Sotho",
            "name": ""
        },
        {
            "shortcut": "tk",
            "english_name": "Turkmen",
            "name": ""
        },
        {
            "shortcut": "uz",
            "english_name": "Uzbek",
            "name": "ozbek"
        },
        {
            "shortcut": "vi",
            "english_name": "Vietnamese",
            "name": "Tiếng Việt"
        },
        {
            "shortcut": "el",
            "english_name": "Greek",
            "name": "ελληνικά"
        },
        {
            "shortcut": "ca",
            "english_name": "Catalan",
            "name": "Català"
        },
        {
            "shortcut": "cy",
            "english_name": "Welsh",
            "name": "Cymraeg"
        },
        {
            "shortcut": "de",
            "english_name": "German",
            "name": "Deutsch"
        },
        {
            "shortcut": "ks",
            "english_name": "Kashmiri",
            "name": ""
        },
        {
            "shortcut": "ms",
            "english_name": "Malay",
            "name": "Bahasa melayu"
        },
        {
            "shortcut": "nb",
            "english_name": "Norwegian Bokmål",
            "name": "Bokmål"
        },
        {
            "shortcut": "rm",
            "english_name": "Raeto-Romance",
            "name": ""
        },
        {
            "shortcut": "si",
            "english_name": "Sinhalese",
            "name": "සිංහල"
        },
        {
            "shortcut": "es",
            "english_name": "Spanish",
            "name": "Español"
        },
        {
            "shortcut": "te",
            "english_name": "Telugu",
            "name": "తెలుగు"
        },
        {
            "shortcut": "tw",
            "english_name": "Twi",
            "name": ""
        },
        {
            "shortcut": "ps",
            "english_name": "Pushto",
            "name": "پښتو"
        },
        {
            "shortcut": "bg",
            "english_name": "Bulgarian",
            "name": "български език"
        },
        {
            "shortcut": "mk",
            "english_name": "Macedonian",
            "name": ""
        },
        {
            "shortcut": "ik",
            "english_name": "Inupiaq",
            "name": ""
        },
        {
            "shortcut": "ko",
            "english_name": "Korean",
            "name": "한국어/조선말"
        },
        {
            "shortcut": "lt",
            "english_name": "Lithuanian",
            "name": "Lietuvių"
        },
        {
            "shortcut": "om",
            "english_name": "Oromo",
            "name": ""
        },
        {
            "shortcut": "se",
            "english_name": "Northern Sami",
            "name": ""
        },
        {
            "shortcut": "so",
            "english_name": "Somali",
            "name": "Somali"
        },
        {
            "shortcut": "ta",
            "english_name": "Tamil",
            "name": "தமிழ்"
        },
        {
            "shortcut": "ur",
            "english_name": "Urdu",
            "name": "اردو"
        },
        {
            "shortcut": "am",
            "english_name": "Amharic",
            "name": ""
        },
        {
            "shortcut": "bs",
            "english_name": "Bosnian",
            "name": "Bosanski"
        },
        {
            "shortcut": "dv",
            "english_name": "Divehi",
            "name": ""
        },
        {
            "shortcut": "ay",
            "english_name": "Aymara",
            "name": ""
        },
        {
            "shortcut": "bm",
            "english_name": "Bambara",
            "name": "Bamanankan"
        },
        {
            "shortcut": "ii",
            "english_name": "Yi",
            "name": ""
        },
        {
            "shortcut": "ie",
            "english_name": "Interlingue",
            "name": ""
        },
        {
            "shortcut": "kv",
            "english_name": "Komi",
            "name": ""
        },
        {
            "shortcut": "ku",
            "english_name": "Kurdish",
            "name": ""
        },
        {
            "shortcut": "nn",
            "english_name": "Norwegian Nynorsk",
            "name": ""
        },
        {
            "shortcut": "zh",
            "english_name": "Mandarin",
            "name": "普通话"
        },
        {
            "shortcut": "he",
            "english_name": "Hebrew",
            "name": "עִבְרִית"
        },
        {
            "shortcut": "ee",
            "english_name": "Ewe",
            "name": "Èʋegbe"
        },
        {
            "shortcut": "fj",
            "english_name": "Fijian",
            "name": ""
        },
        {
            "shortcut": "ff",
            "english_name": "Fulah",
            "name": "Fulfulde"
        },
        {
            "shortcut": "ht",
            "english_name": "Haitian; Haitian Creole",
            "name": ""
        },
        {
            "shortcut": "hr",
            "english_name": "Croatian",
            "name": "Hrvatski"
        },
        {
            "shortcut": "ia",
            "english_name": "Interlingua",
            "name": ""
        },
        {
            "shortcut": "kj",
            "english_name": "Kuanyama",
            "name": ""
        },
        {
            "shortcut": "lo",
            "english_name": "Lao",
            "name": ""
        },
        {
            "shortcut": "lg",
            "english_name": "Ganda",
            "name": ""
        },
        {
            "shortcut": "mr",
            "english_name": "Marathi",
            "name": ""
        },
        {
            "shortcut": "sd",
            "english_name": "Sindhi",
            "name": ""
        },
        {
            "shortcut": "be",
            "english_name": "Belarusian",
            "name": "беларуская мова"
        },
        {
            "shortcut": "ho",
            "english_name": "Hiri Motu",
            "name": ""
        },
        {
            "shortcut": "kg",
            "english_name": "Kongo",
            "name": ""
        },
        {
            "shortcut": "sl",
            "english_name": "Slovenian",
            "name": "Slovenščina"
        },
        {
            "shortcut": "yo",
            "english_name": "Yoruba",
            "name": "Èdè Yorùbá"
        }
    ]

    const [value, SetValue] = useState("");

    useEffect(() => {
        const languagee = lang.map(item => {
            if (item.shortcut === Language) {
                SetValue(item.english_name);
            }
        })
    }, [Language])

    return (
        <div>{value}</div>
    )
}

export default Languages