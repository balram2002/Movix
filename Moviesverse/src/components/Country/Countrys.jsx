import React, { useEffect, useState } from 'react'

function Countrys({ country, countryy }) {

    const coun = [
        {
            "shortcut": "AD",
            "english_name": "Andorra",
            "native_name": "Andorra"
        },
        {
            "shortcut": "AE",
            "english_name": "United Arab Emirates",
            "native_name": "United Arab Emirates"
        },
        {
            "shortcut": "AF",
            "english_name": "Afghanistan",
            "native_name": "Afghanistan"
        },
        {
            "shortcut": "AG",
            "english_name": "Antigua and Barbuda",
            "native_name": "Antigua & Barbuda"
        },
        {
            "shortcut": "AI",
            "english_name": "Anguilla",
            "native_name": "Anguilla"
        },
        {
            "shortcut": "AL",
            "english_name": "Albania",
            "native_name": "Albania"
        },
        {
            "shortcut": "AM",
            "english_name": "Armenia",
            "native_name": "Armenia"
        },
        {
            "shortcut": "AN",
            "english_name": "Netherlands Antilles",
            "native_name": "Netherlands Antilles"
        },
        {
            "shortcut": "AO",
            "english_name": "Angola",
            "native_name": "Angola"
        },
        {
            "shortcut": "AQ",
            "english_name": "Antarctica",
            "native_name": "Antarctica"
        },
        {
            "shortcut": "AR",
            "english_name": "Argentina",
            "native_name": "Argentina"
        },
        {
            "shortcut": "AS",
            "english_name": "American Samoa",
            "native_name": "American Samoa"
        },
        {
            "shortcut": "AT",
            "english_name": "Austria",
            "native_name": "Austria"
        },
        {
            "shortcut": "AU",
            "english_name": "Australia",
            "native_name": "Australia"
        },
        {
            "shortcut": "AW",
            "english_name": "Aruba",
            "native_name": "Aruba"
        },
        {
            "shortcut": "AZ",
            "english_name": "Azerbaijan",
            "native_name": "Azerbaijan"
        },
        {
            "shortcut": "BA",
            "english_name": "Bosnia and Herzegovina",
            "native_name": "Bosnia & Herzegovina"
        },
        {
            "shortcut": "BB",
            "english_name": "Barbados",
            "native_name": "Barbados"
        },
        {
            "shortcut": "BD",
            "english_name": "Bangladesh",
            "native_name": "Bangladesh"
        },
        {
            "shortcut": "BE",
            "english_name": "Belgium",
            "native_name": "Belgium"
        },
        {
            "shortcut": "BF",
            "english_name": "Burkina Faso",
            "native_name": "Burkina Faso"
        },
        {
            "shortcut": "BG",
            "english_name": "Bulgaria",
            "native_name": "Bulgaria"
        },
        {
            "shortcut": "BH",
            "english_name": "Bahrain",
            "native_name": "Bahrain"
        },
        {
            "shortcut": "BI",
            "english_name": "Burundi",
            "native_name": "Burundi"
        },
        {
            "shortcut": "BJ",
            "english_name": "Benin",
            "native_name": "Benin"
        },
        {
            "shortcut": "BM",
            "english_name": "Bermuda",
            "native_name": "Bermuda"
        },
        {
            "shortcut": "BN",
            "english_name": "Brunei Darussalam",
            "native_name": "Brunei"
        },
        {
            "shortcut": "BO",
            "english_name": "Bolivia",
            "native_name": "Bolivia"
        },
        {
            "shortcut": "BR",
            "english_name": "Brazil",
            "native_name": "Brazil"
        },
        {
            "shortcut": "BS",
            "english_name": "Bahamas",
            "native_name": "Bahamas"
        },
        {
            "shortcut": "BT",
            "english_name": "Bhutan",
            "native_name": "Bhutan"
        },
        {
            "shortcut": "BU",
            "english_name": "Burma",
            "native_name": "Burma"
        },
        {
            "shortcut": "BV",
            "english_name": "Bouvet Island",
            "native_name": "Bouvet Island"
        },
        {
            "shortcut": "BW",
            "english_name": "Botswana",
            "native_name": "Botswana"
        },
        {
            "shortcut": "BY",
            "english_name": "Belarus",
            "native_name": "Belarus"
        },
        {
            "shortcut": "BZ",
            "english_name": "Belize",
            "native_name": "Belize"
        },
        {
            "shortcut": "CA",
            "english_name": "Canada",
            "native_name": "Canada"
        },
        {
            "shortcut": "CC",
            "english_name": "Cocos  Islands",
            "native_name": "Cocos (Keeling) Islands"
        },
        {
            "shortcut": "CD",
            "english_name": "Congo",
            "native_name": "Democratic Republic of the Congo (Kinshasa)"
        },
        {
            "shortcut": "CF",
            "english_name": "Central African Republic",
            "native_name": "Central African Republic"
        },
        {
            "shortcut": "CG",
            "english_name": "Congo",
            "native_name": "Republic of the Congo (Brazzaville)"
        },
        {
            "shortcut": "CH",
            "english_name": "Switzerland",
            "native_name": "Switzerland"
        },
        {
            "shortcut": "CI",
            "english_name": "Cote D'Ivoire",
            "native_name": "Côte d’Ivoire"
        },
        {
            "shortcut": "CK",
            "english_name": "Cook Islands",
            "native_name": "Cook Islands"
        },
        {
            "shortcut": "CL",
            "english_name": "Chile",
            "native_name": "Chile"
        },
        {
            "shortcut": "CM",
            "english_name": "Cameroon",
            "native_name": "Cameroon"
        },
        {
            "shortcut": "CN",
            "english_name": "China",
            "native_name": "China"
        },
        {
            "shortcut": "CO",
            "english_name": "Colombia",
            "native_name": "Colombia"
        },
        {
            "shortcut": "CR",
            "english_name": "Costa Rica",
            "native_name": "Costa Rica"
        },
        {
            "shortcut": "CS",
            "english_name": "Serbia and Montenegro",
            "native_name": "Serbia and Montenegro"
        },
        {
            "shortcut": "CU",
            "english_name": "Cuba",
            "native_name": "Cuba"
        },
        {
            "shortcut": "CV",
            "english_name": "Cape Verde",
            "native_name": "Cape Verde"
        },
        {
            "shortcut": "CX",
            "english_name": "Christmas Island",
            "native_name": "Christmas Island"
        },
        {
            "shortcut": "CY",
            "english_name": "Cyprus",
            "native_name": "Cyprus"
        },
        {
            "shortcut": "CZ",
            "english_name": "Czech Republic",
            "native_name": "Czech Republic"
        },
        {
            "shortcut": "DE",
            "english_name": "Germany",
            "native_name": "Germany"
        },
        {
            "shortcut": "DJ",
            "english_name": "Djibouti",
            "native_name": "Djibouti"
        },
        {
            "shortcut": "DK",
            "english_name": "Denmark",
            "native_name": "Denmark"
        },
        {
            "shortcut": "DM",
            "english_name": "Dominica",
            "native_name": "Dominica"
        },
        {
            "shortcut": "DO",
            "english_name": "Dominican Republic",
            "native_name": "Dominican Republic"
        },
        {
            "shortcut": "DZ",
            "english_name": "Algeria",
            "native_name": "Algeria"
        },
        {
            "shortcut": "EC",
            "english_name": "Ecuador",
            "native_name": "Ecuador"
        },
        {
            "shortcut": "EE",
            "english_name": "Estonia",
            "native_name": "Estonia"
        },
        {
            "shortcut": "EG",
            "english_name": "Egypt",
            "native_name": "Egypt"
        },
        {
            "shortcut": "EH",
            "english_name": "Western Sahara",
            "native_name": "Western Sahara"
        },
        {
            "shortcut": "ER",
            "english_name": "Eritrea",
            "native_name": "Eritrea"
        },
        {
            "shortcut": "ES",
            "english_name": "Spain",
            "native_name": "Spain"
        },
        {
            "shortcut": "ET",
            "english_name": "Ethiopia",
            "native_name": "Ethiopia"
        },
        {
            "shortcut": "FI",
            "english_name": "Finland",
            "native_name": "Finland"
        },
        {
            "shortcut": "FJ",
            "english_name": "Fiji",
            "native_name": "Fiji"
        },
        {
            "shortcut": "FK",
            "english_name": "Falkland Islands",
            "native_name": "Falkland Islands"
        },
        {
            "shortcut": "FM",
            "english_name": "Micronesia",
            "native_name": "Micronesia"
        },
        {
            "shortcut": "FO",
            "english_name": "Faeroe Islands",
            "native_name": "Faroe Islands"
        },
        {
            "shortcut": "FR",
            "english_name": "France",
            "native_name": "France"
        },
        {
            "shortcut": "GA",
            "english_name": "Gabon",
            "native_name": "Gabon"
        },
        {
            "shortcut": "GB",
            "english_name": "United Kingdom",
            "native_name": "United Kingdom"
        },
        {
            "shortcut": "GD",
            "english_name": "Grenada",
            "native_name": "Grenada"
        },
        {
            "shortcut": "GE",
            "english_name": "Georgia",
            "native_name": "Georgia"
        },
        {
            "shortcut": "GF",
            "english_name": "French Guiana",
            "native_name": "French Guiana"
        },
        {
            "shortcut": "GH",
            "english_name": "Ghana",
            "native_name": "Ghana"
        },
        {
            "shortcut": "GI",
            "english_name": "Gibraltar",
            "native_name": "Gibraltar"
        },
        {
            "shortcut": "GL",
            "english_name": "Greenland",
            "native_name": "Greenland"
        },
        {
            "shortcut": "GM",
            "english_name": "Gambia",
            "native_name": "Gambia"
        },
        {
            "shortcut": "GN",
            "english_name": "Guinea",
            "native_name": "Guinea"
        },
        {
            "shortcut": "GP",
            "english_name": "Guadaloupe",
            "native_name": "Guadeloupe"
        },
        {
            "shortcut": "GQ",
            "english_name": "Equatorial Guinea",
            "native_name": "Equatorial Guinea"
        },
        {
            "shortcut": "GR",
            "english_name": "Greece",
            "native_name": "Greece"
        },
        {
            "shortcut": "GS",
            "english_name": "South Georgia and the South Sandwich Islands",
            "native_name": "South Georgia & South Sandwich Islands"
        },
        {
            "shortcut": "GT",
            "english_name": "Guatemala",
            "native_name": "Guatemala"
        },
        {
            "shortcut": "GU",
            "english_name": "Guam",
            "native_name": "Guam"
        },
        {
            "shortcut": "GW",
            "english_name": "Guinea-Bissau",
            "native_name": "Guinea-Bissau"
        },
        {
            "shortcut": "GY",
            "english_name": "Guyana",
            "native_name": "Guyana"
        },
        {
            "shortcut": "HK",
            "english_name": "Hong Kong",
            "native_name": "Hong Kong SAR China"
        },
        {
            "shortcut": "HM",
            "english_name": "Heard and McDonald Islands",
            "native_name": "Heard & McDonald Islands"
        },
        {
            "shortcut": "HN",
            "english_name": "Honduras",
            "native_name": "Honduras"
        },
        {
            "shortcut": "HR",
            "english_name": "Croatia",
            "native_name": "Croatia"
        },
        {
            "shortcut": "HT",
            "english_name": "Haiti",
            "native_name": "Haiti"
        },
        {
            "shortcut": "HU",
            "english_name": "Hungary",
            "native_name": "Hungary"
        },
        {
            "shortcut": "ID",
            "english_name": "Indonesia",
            "native_name": "Indonesia"
        },
        {
            "shortcut": "IE",
            "english_name": "Ireland",
            "native_name": "Ireland"
        },
        {
            "shortcut": "IL",
            "english_name": "Israel",
            "native_name": "Israel"
        },
        {
            "shortcut": "IN",
            "english_name": "India",
            "native_name": "India"
        },
        {
            "shortcut": "IO",
            "english_name": "British Indian Ocean Territory",
            "native_name": "British Indian Ocean Territory"
        },
        {
            "shortcut": "IQ",
            "english_name": "Iraq",
            "native_name": "Iraq"
        },
        {
            "shortcut": "IR",
            "english_name": "Iran",
            "native_name": "Iran"
        },
        {
            "shortcut": "IS",
            "english_name": "Iceland",
            "native_name": "Iceland"
        },
        {
            "shortcut": "IT",
            "english_name": "Italy",
            "native_name": "Italy"
        },
        {
            "shortcut": "JM",
            "english_name": "Jamaica",
            "native_name": "Jamaica"
        },
        {
            "shortcut": "JO",
            "english_name": "Jordan",
            "native_name": "Jordan"
        },
        {
            "shortcut": "JP",
            "english_name": "Japan",
            "native_name": "Japan"
        },
        {
            "shortcut": "KE",
            "english_name": "Kenya",
            "native_name": "Kenya"
        },
        {
            "shortcut": "KG",
            "english_name": "Kyrgyz Republic",
            "native_name": "Kyrgyzstan"
        },
        {
            "shortcut": "KH",
            "english_name": "Cambodia",
            "native_name": "Cambodia"
        },
        {
            "shortcut": "KI",
            "english_name": "Kiribati",
            "native_name": "Kiribati"
        },
        {
            "shortcut": "KM",
            "english_name": "Comoros",
            "native_name": "Comoros"
        },
        {
            "shortcut": "KN",
            "english_name": "St. Kitts and Nevis",
            "native_name": "St. Kitts & Nevis"
        },
        {
            "shortcut": "KP",
            "english_name": "North Korea",
            "native_name": "North Korea"
        },
        {
            "shortcut": "KR",
            "english_name": "South Korea",
            "native_name": "South Korea"
        },
        {
            "shortcut": "KW",
            "english_name": "Kuwait",
            "native_name": "Kuwait"
        },
        {
            "shortcut": "KY",
            "english_name": "Cayman Islands",
            "native_name": "Cayman Islands"
        },
        {
            "shortcut": "KZ",
            "english_name": "Kazakhstan",
            "native_name": "Kazakhstan"
        },
        {
            "shortcut": "LA",
            "english_name": "Lao People's Democratic Republic",
            "native_name": "Laos"
        },
        {
            "shortcut": "LB",
            "english_name": "Lebanon",
            "native_name": "Lebanon"
        },
        {
            "shortcut": "LC",
            "english_name": "St. Lucia",
            "native_name": "St. Lucia"
        },
        {
            "shortcut": "LI",
            "english_name": "Liechtenstein",
            "native_name": "Liechtenstein"
        },
        {
            "shortcut": "LK",
            "english_name": "Sri Lanka",
            "native_name": "Sri Lanka"
        },
        {
            "shortcut": "LR",
            "english_name": "Liberia",
            "native_name": "Liberia"
        },
        {
            "shortcut": "LS",
            "english_name": "Lesotho",
            "native_name": "Lesotho"
        },
        {
            "shortcut": "LT",
            "english_name": "Lithuania",
            "native_name": "Lithuania"
        },
        {
            "shortcut": "LU",
            "english_name": "Luxembourg",
            "native_name": "Luxembourg"
        },
        {
            "shortcut": "LV",
            "english_name": "Latvia",
            "native_name": "Latvia"
        },
        {
            "shortcut": "LY",
            "english_name": "Libyan Arab Jamahiriya",
            "native_name": "Libya"
        },
        {
            "shortcut": "MA",
            "english_name": "Morocco",
            "native_name": "Morocco"
        },
        {
            "shortcut": "MC",
            "english_name": "Monaco",
            "native_name": "Monaco"
        },
        {
            "shortcut": "MD",
            "english_name": "Moldova",
            "native_name": "Moldova"
        },
        {
            "shortcut": "ME",
            "english_name": "Montenegro",
            "native_name": "Montenegro"
        },
        {
            "shortcut": "MG",
            "english_name": "Madagascar",
            "native_name": "Madagascar"
        },
        {
            "shortcut": "MH",
            "english_name": "Marshall Islands",
            "native_name": "Marshall Islands"
        },
        {
            "shortcut": "MK",
            "english_name": "Macedonia",
            "native_name": "Macedonia"
        },
        {
            "shortcut": "ML",
            "english_name": "Mali",
            "native_name": "Mali"
        },
        {
            "shortcut": "MM",
            "english_name": "Myanmar",
            "native_name": "Myanmar (Burma)"
        },
        {
            "shortcut": "MN",
            "english_name": "Mongolia",
            "native_name": "Mongolia"
        },
        {
            "shortcut": "MO",
            "english_name": "Macao",
            "native_name": "Macau SAR China"
        },
        {
            "shortcut": "MP",
            "english_name": "Northern Mariana Islands",
            "native_name": "Northern Mariana Islands"
        },
        {
            "shortcut": "MQ",
            "english_name": "Martinique",
            "native_name": "Martinique"
        },
        {
            "shortcut": "MR",
            "english_name": "Mauritania",
            "native_name": "Mauritania"
        },
        {
            "shortcut": "MS",
            "english_name": "Montserrat",
            "native_name": "Montserrat"
        },
        {
            "shortcut": "MT",
            "english_name": "Malta",
            "native_name": "Malta"
        },
        {
            "shortcut": "MU",
            "english_name": "Mauritius",
            "native_name": "Mauritius"
        },
        {
            "shortcut": "MV",
            "english_name": "Maldives",
            "native_name": "Maldives"
        },
        {
            "shortcut": "MW",
            "english_name": "Malawi",
            "native_name": "Malawi"
        },
        {
            "shortcut": "MX",
            "english_name": "Mexico",
            "native_name": "Mexico"
        },
        {
            "shortcut": "MY",
            "english_name": "Malaysia",
            "native_name": "Malaysia"
        },
        {
            "shortcut": "MZ",
            "english_name": "Mozambique",
            "native_name": "Mozambique"
        },
        {
            "shortcut": "NA",
            "english_name": "Namibia",
            "native_name": "Namibia"
        },
        {
            "shortcut": "NC",
            "english_name": "New Caledonia",
            "native_name": "New Caledonia"
        },
        {
            "shortcut": "NE",
            "english_name": "Niger",
            "native_name": "Niger"
        },
        {
            "shortcut": "NF",
            "english_name": "Norfolk Island",
            "native_name": "Norfolk Island"
        },
        {
            "shortcut": "NG",
            "english_name": "Nigeria",
            "native_name": "Nigeria"
        },
        {
            "shortcut": "NI",
            "english_name": "Nicaragua",
            "native_name": "Nicaragua"
        },
        {
            "shortcut": "NL",
            "english_name": "Netherlands",
            "native_name": "Netherlands"
        },
        {
            "shortcut": "NO",
            "english_name": "Norway",
            "native_name": "Norway"
        },
        {
            "shortcut": "NP",
            "english_name": "Nepal",
            "native_name": "Nepal"
        },
        {
            "shortcut": "NR",
            "english_name": "Nauru",
            "native_name": "Nauru"
        },
        {
            "shortcut": "NU",
            "english_name": "Niue",
            "native_name": "Niue"
        },
        {
            "shortcut": "NZ",
            "english_name": "New Zealand",
            "native_name": "New Zealand"
        },
        {
            "shortcut": "OM",
            "english_name": "Oman",
            "native_name": "Oman"
        },
        {
            "shortcut": "PA",
            "english_name": "Panama",
            "native_name": "Panama"
        },
        {
            "shortcut": "PE",
            "english_name": "Peru",
            "native_name": "Peru"
        },
        {
            "shortcut": "PF",
            "english_name": "French Polynesia",
            "native_name": "French Polynesia"
        },
        {
            "shortcut": "PG",
            "english_name": "Papua New Guinea",
            "native_name": "Papua New Guinea"
        },
        {
            "shortcut": "PH",
            "english_name": "Philippines",
            "native_name": "Philippines"
        },
        {
            "shortcut": "PK",
            "english_name": "Pakistan",
            "native_name": "Pakistan"
        },
        {
            "shortcut": "PL",
            "english_name": "Poland",
            "native_name": "Poland"
        },
        {
            "shortcut": "PM",
            "english_name": "St. Pierre and Miquelon",
            "native_name": "St. Pierre & Miquelon"
        },
        {
            "shortcut": "PN",
            "english_name": "Pitcairn Island",
            "native_name": "Pitcairn Islands"
        },
        {
            "shortcut": "PR",
            "english_name": "Puerto Rico",
            "native_name": "Puerto Rico"
        },
        {
            "shortcut": "PS",
            "english_name": "Palestinian Territory",
            "native_name": "Palestinian Territories"
        },
        {
            "shortcut": "PT",
            "english_name": "Portugal",
            "native_name": "Portugal"
        },
        {
            "shortcut": "PW",
            "english_name": "Palau",
            "native_name": "Palau"
        },
        {
            "shortcut": "PY",
            "english_name": "Paraguay",
            "native_name": "Paraguay"
        },
        {
            "shortcut": "QA",
            "english_name": "Qatar",
            "native_name": "Qatar"
        },
        {
            "shortcut": "RE",
            "english_name": "Reunion",
            "native_name": "Réunion"
        },
        {
            "shortcut": "RO",
            "english_name": "Romania",
            "native_name": "Romania"
        },
        {
            "shortcut": "RS",
            "english_name": "Serbia",
            "native_name": "Serbia"
        },
        {
            "shortcut": "RU",
            "english_name": "Russia",
            "native_name": "Russia"
        },
        {
            "shortcut": "RW",
            "english_name": "Rwanda",
            "native_name": "Rwanda"
        },
        {
            "shortcut": "SA",
            "english_name": "Saudi Arabia",
            "native_name": "Saudi Arabia"
        },
        {
            "shortcut": "SB",
            "english_name": "Solomon Islands",
            "native_name": "Solomon Islands"
        },
        {
            "shortcut": "SC",
            "english_name": "Seychelles",
            "native_name": "Seychelles"
        },
        {
            "shortcut": "SD",
            "english_name": "Sudan",
            "native_name": "Sudan"
        },
        {
            "shortcut": "SE",
            "english_name": "Sweden",
            "native_name": "Sweden"
        },
        {
            "shortcut": "SG",
            "english_name": "Singapore",
            "native_name": "Singapore"
        },
        {
            "shortcut": "SH",
            "english_name": "St. Helena",
            "native_name": "St. Helena"
        },
        {
            "shortcut": "SI",
            "english_name": "Slovenia",
            "native_name": "Slovenia"
        },
        {
            "shortcut": "SJ",
            "english_name": "Svalbard & Jan Mayen Islands",
            "native_name": "Svalbard & Jan Mayen"
        },
        {
            "shortcut": "SK",
            "english_name": "Slovakia",
            "native_name": "Slovakia"
        },
        {
            "shortcut": "SL",
            "english_name": "Sierra Leone",
            "native_name": "Sierra Leone"
        },
        {
            "shortcut": "SM",
            "english_name": "San Marino",
            "native_name": "San Marino"
        },
        {
            "shortcut": "SN",
            "english_name": "Senegal",
            "native_name": "Senegal"
        },
        {
            "shortcut": "SO",
            "english_name": "Somalia",
            "native_name": "Somalia"
        },
        {
            "shortcut": "SR",
            "english_name": "Suriname",
            "native_name": "Suriname"
        },
        {
            "shortcut": "SS",
            "english_name": "South Sudan",
            "native_name": "South Sudan"
        },
        {
            "shortcut": "ST",
            "english_name": "Sao Tome and Principe",
            "native_name": "São Tomé & Príncipe"
        },
        {
            "shortcut": "SU",
            "english_name": "Soviet Union",
            "native_name": "Soviet Union"
        },
        {
            "shortcut": "SV",
            "english_name": "El Salvador",
            "native_name": "El Salvador"
        },
        {
            "shortcut": "SY",
            "english_name": "Syrian Arab Republic",
            "native_name": "Syria"
        },
        {
            "shortcut": "SZ",
            "english_name": "Swaziland",
            "native_name": "Eswatini (Swaziland)"
        },
        {
            "shortcut": "TC",
            "english_name": "Turks and Caicos Islands",
            "native_name": "Turks & Caicos Islands"
        },
        {
            "shortcut": "TD",
            "english_name": "Chad",
            "native_name": "Chad"
        },
        {
            "shortcut": "TF",
            "english_name": "French Southern Territories",
            "native_name": "French Southern Territories"
        },
        {
            "shortcut": "TG",
            "english_name": "Togo",
            "native_name": "Togo"
        },
        {
            "shortcut": "TH",
            "english_name": "Thailand",
            "native_name": "Thailand"
        },
        {
            "shortcut": "TJ",
            "english_name": "Tajikistan",
            "native_name": "Tajikistan"
        },
        {
            "shortcut": "TK",
            "english_name": "Tokelau",
            "native_name": "Tokelau"
        },
        {
            "shortcut": "TL",
            "english_name": "Timor-Leste",
            "native_name": "Timor-Leste"
        },
        {
            "shortcut": "TM",
            "english_name": "Turkmenistan",
            "native_name": "Turkmenistan"
        },
        {
            "shortcut": "TN",
            "english_name": "Tunisia",
            "native_name": "Tunisia"
        },
        {
            "shortcut": "TO",
            "english_name": "Tonga",
            "native_name": "Tonga"
        },
        {
            "shortcut": "TP",
            "english_name": "East Timor",
            "native_name": "East Timor"
        },
        {
            "shortcut": "TR",
            "english_name": "Turkey",
            "native_name": "Turkey"
        },
        {
            "shortcut": "TT",
            "english_name": "Trinidad and Tobago",
            "native_name": "Trinidad & Tobago"
        },
        {
            "shortcut": "TV",
            "english_name": "Tuvalu",
            "native_name": "Tuvalu"
        },
        {
            "shortcut": "TW",
            "english_name": "Taiwan",
            "native_name": "Taiwan"
        },
        {
            "shortcut": "TZ",
            "english_name": "Tanzania",
            "native_name": "Tanzania"
        },
        {
            "shortcut": "UA",
            "english_name": "Ukraine",
            "native_name": "Ukraine"
        },
        {
            "shortcut": "UG",
            "english_name": "Uganda",
            "native_name": "Uganda"
        },
        {
            "shortcut": "UM",
            "english_name": "United States Minor Outlying Islands",
            "native_name": "U.S. Outlying Islands"
        },
        {
            "shortcut": "US",
            "english_name": "United States of America",
            "native_name": "United States"
        },
        {
            "shortcut": "UY",
            "english_name": "Uruguay",
            "native_name": "Uruguay"
        },
        {
            "shortcut": "UZ",
            "english_name": "Uzbekistan",
            "native_name": "Uzbekistan"
        },
        {
            "shortcut": "VA",
            "english_name": "Holy See",
            "native_name": "Vatican City"
        },
        {
            "shortcut": "VC",
            "english_name": "St. Vincent and the Grenadines",
            "native_name": "St. Vincent & Grenadines"
        },
        {
            "shortcut": "VE",
            "english_name": "Venezuela",
            "native_name": "Venezuela"
        },
        {
            "shortcut": "VG",
            "english_name": "British Virgin Islands",
            "native_name": "British Virgin Islands"
        },
        {
            "shortcut": "VI",
            "english_name": "US Virgin Islands",
            "native_name": "U.S. Virgin Islands"
        },
        {
            "shortcut": "VN",
            "english_name": "Vietnam",
            "native_name": "Vietnam"
        },
        {
            "shortcut": "VU",
            "english_name": "Vanuatu",
            "native_name": "Vanuatu"
        },
        {
            "shortcut": "WF",
            "english_name": "Wallis and Futuna Islands",
            "native_name": "Wallis & Futuna"
        },
        {
            "shortcut": "WS",
            "english_name": "Samoa",
            "native_name": "Samoa"
        },
        {
            "shortcut": "XC",
            "english_name": "Czechoslovakia",
            "native_name": "Czechoslovakia"
        },
        {
            "shortcut": "XG",
            "english_name": "East Germany",
            "native_name": "East Germany"
        },
        {
            "shortcut": "XI",
            "english_name": "Northern Ireland",
            "native_name": "Northern Ireland"
        },
        {
            "shortcut": "XK",
            "english_name": "Kosovo",
            "native_name": "Kosovo"
        },
        {
            "shortcut": "YE",
            "english_name": "Yemen",
            "native_name": "Yemen"
        },
        {
            "shortcut": "YT",
            "english_name": "Mayotte",
            "native_name": "Mayotte"
        },
        {
            "shortcut": "YU",
            "english_name": "Yugoslavia",
            "native_name": "Yugoslavia"
        },
        {
            "shortcut": "ZA",
            "english_name": "South Africa",
            "native_name": "South Africa"
        },
        {
            "shortcut": "ZM",
            "english_name": "Zambia",
            "native_name": "Zambia"
        },
        {
            "shortcut": "ZR",
            "english_name": "Zaire",
            "native_name": "Zaire"
        },
        {
            "shortcut": "ZW",
            "english_name": "Zimbabwe",
            "native_name": "Zimbabwe"
        }
    ]

    const [value, SetValue] = useState("");

    useEffect(() => {
        const countryy = coun.map(item => {
            country.forEach(element => {
                if (item.shortcut === element) {
                    SetValue(item.english_name);
                }
                // SetValue(element.name);
            });
        })
    }, [country]);

    return (
        <div>{value}</div>
    )
}

export default Countrys