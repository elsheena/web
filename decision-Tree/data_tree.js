function getData(number) {
    let data = [];
    data[0] = [
        ["outlook",     "temperature",  "humidity",     "windy",    "play"  ],
        ["overcast",    "hot",          "high",         "FALSE",    "yes"   ],
        ["overcast",    "cool",         "normal",       "TRUE",     "yes"   ],
        ["overcast",    "mild",         "high",         "TRUE",     "yes"   ],
        ["overcast",    "hot",          "normal",       "FALSE",    "yes"   ],
        ["rainy",       "mild",         "high",         "FALSE",    "yes"   ],
        ["rainy",       "cool",         "normal",       "FALSE",    "yes"   ],
        ["rainy",       "cool",         "normal",       "TRUE",     "no"    ],
        ["rainy",       "mild",         "normal",       "FALSE",    "yes"   ],
        ["rainy",       "mild",         "high",         "TRUE",     "no"    ],
        ["sunny",       "hot",          "high",         "FALSE",    "no"    ],
        ["sunny",       "hot",          "high",         "TRUE",     "no"    ],
        ["sunny",       "mild",         "high",         "FALSE",    "no"    ],
        ["sunny",       "cool",         "normal",       "FALSE",    "yes"   ],
        ["sunny",       "mild",         "normal",       "TRUE",     "yes"   ]
    ];
    
    data[1] = [
        ["Opponent", "Playing", "Leaders", "Rain", "Victory"],
        ["Above", "At Home", "In place", "Yes", "No"],
        ["Above", "At Home", "In place", "No", "Yes"],
        ["Above", "At Home", "Skip", "No", "No"],
        ["Below", "At Home", "Skip", "No", "Yes"],
        ["Below", "Visiting", "Missing", "No", "No"],
        ["Below", "At Home", "Skip", "Yes", "Yes"],
        ["Above", "Visiting", "On the spot", "Yes", "No"],
        ["Below", "Visiting", "On the spot", "No", "Yes"]
    ];

    data[2] = [
        ["Precipitation", "Temperature", "Humidity", "Wind", "Class"],
        ["Sunny", "Hot", "High", "No", "Don't play"],
        ["Sunny", "Hot", "High", "Yes", "Don't play"],
        ["P. Cloudy", "Hot", "High", "No", "Play"],
        ["Cloudy", "Moderate", "High", "No", "Play"],
        ["Cloudy", "Cool", "Normal", "No", "Play"],
        ["Cloudy", "Cool", "Normal", "Yes", "Do not play"],
        ["P. Cloudy", "Cool", "Normal", "Yes", "Play"],
        ["Sunny", "Moderate", "High", "No", "Do not play"],
        ["Sunny", "Cool", "Normal", "No", "Play"],
        ["Cloudy", "Moderate", "Normal", "No", "Play"],
        ["Sunny", "Moderate", "Normal", "Yes", "Play"],
        ["P. Cloudy", "Moderate", "High", "Yes", "Play"],
        ["P. cloudy", "Hot", "Normal", "No", "Play"],
        ["Cloudy", "Moderate", "High", "Yes", "Do not play"]
    ];
    
    data[3] = [
        ["usd",     "lamphat",  "nctt",     "slkt",     "play " ],
        ["TANG",    "GIAM",     "THAP",     "TB",       "THAP " ],
        ["TANG",    "TANG",     "THAP",     "TB",       "CAO "  ],
        ["TANG",    "ON DINH",  "CAO",      "TB",       "CAO "  ],
        ["TANG",    "TANG",     "THAP",     "THAP",     "CAO "  ],
        ["TANG",    "GIAM",     "TB",       "THAP",     "CAO "  ],
        ["TANG",    "GIAM",     "CAO",      "THAP",     "THAP " ],
        ["TB",      "ON DINH",  "TB",       "CAO",      "THAP " ],
        ["TB",      "GIAM",     "THAP",     "CAO",      "THAP " ],
        ["TB",      "TANG",     "TB",       "THAP",     "THAP " ],
        ["TB",      "ON DINH",  "CAO",      "TB",       "CAO "  ],
        ["TB",      "GIAM",     "CAO",      "CAO",      "CAO "  ],
        ["GIAM",    "ON DINH",  "CAO",      "THAP",     "THAP " ],
        ["GIAM",    "GIAM",     "CAO",      "CAO",      "CAO "  ],
        ["GIAM",    "TANG",     "CAO",      "TB",       "THAP " ],
        ["GIAM",    "TANG",     "THAP",     "THAP",     "THAP " ],
        ["GIAM",    "ON DINH",  "CAO",      "TB",       "CAO "  ]
    ];

    return data[number]
}
