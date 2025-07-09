class ASSIST_TYPES(object):
    TRACK = "track"
    RADIO = "radio"
    STUN = "stun"
    SMOKE = "smoke"
    INSPIRE = "inspire"


class DISPLAY_TYPE:
    BIATHLON = "biathlon"
    LIMITED = "limited"
    SERIES = "series"
    COUNTER = "counter"
    SIMPLE = "simple"
    NONE = "none"


class PROGRESS_TEMPLATE:
    BINARY = "binaryProgress"
    VALUE = "valueProgress"
    COUNTER = "counterProgress"
    BIATHLON = "biathlonProgress"


class CRIT_TYPES(object):
    INNER_MODULES_AND_TANKMEN = "inner-modules-and-tankmen"
    DESTROYED_TRACKS = "destroyed-tracks"
    ALL_MODULES = "all-modules"
    DESTROYED_INNER_MODULES_AND_TANKMAN = "destroyed-inner-modules-and-tankman"


class CONDITION_ICON:
    ASSIST = "assist"
    ASSIST_RADIO = "assist_radio"
    ASSIST_TRACK = "assist_track"
    ASSIST_STUN = "assist_stun"
    ASSIST_STUN_DURATION = "assist_stun_time"
    ASSIST_STUN_MULTY = "assist_stun_multy"
    AWARD = "award"
    BASE_CAPTURE = "base_capture"
    BASE_DEF = "base_def"
    BATTLES = "battles"
    CREDITS = "credits"
    DAMAGE = "damage"
    DAMAGE_BLOCK = "damage_block"
    DISCOVER = "discover"
    EXPERIENCE = "experience"
    FIRE = "fire"
    GET_DAMAGE = "get_damage"
    GET_HIT = "get_hit"
    HIT = "hit"
    HIT_BLOCK = "hit_block"
    HURT_1SHOT = "hurt_1shot"
    HURT_VEHICLES = "hurt_vehicles"
    KILL_1SHOT = "kill_1shot"
    KILL_VEHICLES = "kill_vehicles"
    MASTER = "master"
    METERS = "meters"
    MODULE_CRIT = "module_crit"
    PREPARATION = "preparation"
    SAVE_HP = "save_hp"
    SEC_ALIVE = "sec_alive"
    SURVIVE = "survive"
    TIMES_GET_DAMAGE = "times_get_damage"
    TOP = "top"
    WIN = "win"
    FOLDER = "folder"
    BARREL_MARK = "barrel_mark"
    RAM = "ram"
    MAIN_REPEAT = "main_repeat"
    IMPROVE = "improve"
    RANK_UP = "rank_up"
    PRESTIGE_POINTS = "prestige_points"
    NO_DAMAGE = "no_damage"


class VISIBLE_SCOPE:
    BATTLE = "battle"
    HANGAR = "hangar"


def regularDescription(iconID, limiterID=None, isInOrGroup=False):
    return {
        'iconID': iconID,
        'limiterID': limiterID,
        'isInOrGroup': isInOrGroup,
        'containerType': 'body'
    }
    
def averageDescription(iconID, counterID, limiterID=None, isInOrGroup=False):
    return {
        'iconID': iconID,
        'counterID': counterID,
        'limiterID': limiterID,
        'isInOrGroup': isInOrGroup,
        'containerType': 'body'
    }
    
def headerDescription(displayType, isInOrGroup=False):
    return {
        'displayType': displayType,
        'isInOrGroup': isInOrGroup,
        'containerType': 'header'
    }

class DESCRIPTIONS(object):
    REGULAR = regularDescription
    AVERAGE = averageDescription
    HEADER = headerDescription

config_pm3 = {
    "pm3_8_1_1": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 13000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        }
    },
    "pm3_8_1_2": {
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 20000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        }
    },
    "pm3_8_1_3": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
    },
    "pm3_8_1_4": {
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
        "hitsReceived": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.GET_HIT),
        },
    },
    "pm3_8_1_5": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 1.5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": False,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "spotNumberAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_8_1_6": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        }
    },
    "pm3_8_1_7": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["AT-SPG", "SPG"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 10},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_1_8": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"critTypes": CRIT_TYPES.DESTROYED_TRACKS},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        }
    },
    "pm3_8_1_9": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 55,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
    },
    "pm3_8_1_10": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True, "attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_8_1_11": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1200,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_1_12": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 17,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerWasInvisible": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_8_1_13": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3000,
                "isMain": True,
                "isAward": True,
                "groupID": 1,
                "isInOrGroup": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True},
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.DAMAGE, isInOrGroup=True
            ),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "groupID": 2,
                "isInOrGroup": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
        "piercingSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "groupID": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.HIT, isInOrGroup=True
            ),
        },
    },
    "pm3_8_1_14": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 23000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 15,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"critTypes": CRIT_TYPES.ALL_MODULES},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.MODULE_CRIT),
        },
    },
    "pm3_8_1_15": {
        "piercingSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 2,
                "battlesLimit": 3,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_8_1_16": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        }
    },
    "pm3_8_1_17": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["SPG"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_1_18": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1000,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        },
        "mileage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2000,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.METERS),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_1_19": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 25,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"shouldBeUnspotted": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "assistedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 15,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO],
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        },
    },
    "pm3_8_1_20": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"shouldBeUnspotted": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "xp": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1200,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.EXPERIENCE),
        },
    },
    "pm3_8_1_21": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 9},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_1_22": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 7},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_1_23": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_1_24": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_1_25": {
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 2,
                "battlesLimit": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
        "topByDamageAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 5,
                "battlesLimit": 10,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
        "winAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_8_2_1": {
        "hitsReceived": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 75,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.GET_HIT),
        }
    },
    "pm3_8_2_2": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
    },
    "pm3_8_2_3": {
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        }
    },
    "pm3_8_2_4": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceShortOrEqual": 150},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_8_2_5": {
        "damageDealtReceivedAndBlocked": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10000,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.FOLDER),
        },
        "damageDealtReceivedAndBlockedAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 11000,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.FOLDER),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
    },
    "pm3_8_2_6": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 50,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_8_2_7": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 25,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"], "uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        },
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4500,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetLevelDiff": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
    },
    "pm3_8_2_8": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        }
    },
    "pm3_8_2_9": {
        "killsDiversity": {
            "type": PROGRESS_TEMPLATE.COUNTER,
            "config": {
                "totalGoal": 5,
                "uniqueGoal": 5,
                "isMain": True,
                "isAward": True,
                "isInOrGroup": True,
                "groupID": 1,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.KILL_VEHICLES, isInOrGroup=True
            ),
        },
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 20000,
                "isMain": True,
                "isAward": True,
                "isInOrGroup": True,
                "groupID": 2,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceInVisionRadius": True},
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.DAMAGE, isInOrGroup=True
            ),
        },
    },
    "pm3_8_2_10": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1000,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "critsAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "assistedKillsAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 3,
                "battlesLimit": 10,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_8_2_11": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_2_12": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 15000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerWasInvisible": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_8_2_13": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceGreatOrEqual": 300},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_8_2_14": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_2_15": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5000,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5000,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_8_2_16": {
        "assistedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {
                    "assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO],
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        }
    },
    "pm3_8_2_17": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_2_18": {
        "assistedKills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_2_19": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"shouldBeUnspotted": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_2_20": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 15000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
        "assistAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 20000,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": False,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
    },
    "pm3_8_2_21": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 9},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_2_22": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 7},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 700,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_2_23": {
        "xp": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 500,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.EXPERIENCE),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_2_24": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 8},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"critTypes": CRIT_TYPES.DESTROYED_TRACKS},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_2_25": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
        "topByExpAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_8_3_1": {
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 500,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_2": {
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_3": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
                "params": {"attackReasons": ["shot"], "targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        }
    },
    "pm3_8_3_4": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceShortOrEqual": 150},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 70,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
    },
    "pm3_8_3_5": {
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "dynamicGoal": True,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"vehicleHealthFactor": 1.5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "blockedDamageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "dynamicGoal": True,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"vehicleHealthFactor": 2.5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_8_3_6": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_7": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 2},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_8": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_8_3_9": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"], "targetLevelDiff": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_10": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 25000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.AVERAGE(
                iconID=CONDITION_ICON.DAMAGE, counterID="battlesSeries"
            ),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 60000,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.AVERAGE(
                iconID=CONDITION_ICON.DAMAGE, counterID="battlesSeriesAdv"
            ),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": False,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
    },
    "pm3_8_3_11": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 600,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_12": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_8_3_13": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 500,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"distanceGreatOrEqual": 250},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_14": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
                "params": {"uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        }
    },
    "pm3_8_3_15": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "killsAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_8_3_16": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 30,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        }
    },
    "pm3_8_3_17": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5500,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        }
    },
    "pm3_8_3_18": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 20,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        },
    },
    "pm3_8_3_19": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 400,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_20": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6000,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8000,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_8_3_21": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 9},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_22": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 8},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.NO_DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_23": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 9},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_24": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_8_3_25": {
        "markOfMasteryI": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"markOfMastery": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.AWARD),
        },
        "markOfMasteryISeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 3,
                "battlesLimit": 20,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
        "markOfMasteryMaster": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"markOfMastery": 4},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.MASTER),
        },
        "markOfMasteryMasterSeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 5,
                "battlesLimit": 12,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_9_1_1": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 20000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_9_1_2": {
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 27000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        }
    },
    "pm3_9_1_3": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 60,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
    },
    "pm3_9_1_4": {
        "killsDiversity": {
            "type": PROGRESS_TEMPLATE.COUNTER,
            "config": {
                "uniqueGoal": 2,
                "totalGoal": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"distanceShortOrEqual": 150},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_1_5": {
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "dynamicGoal": True,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"vehicleHealthFactor": 2},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "blockedDamageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "dynamicGoal": True,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"vehicleHealthFactor": 2.5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_9_1_6": {
        "hitsDiversity": {
            "type": PROGRESS_TEMPLATE.COUNTER,
            "config": {
                "uniqueGoal": 2,
                "totalGoal": 4,
                "isMain": True,
                "isAward": False,
                "groupID": 1,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": False,
                "groupID": 2,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "groupID": 2,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries1": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isInOrGroup": True,
                "groupID": 1,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(
                displayType=DISPLAY_TYPE.COUNTER, isInOrGroup=True
            ),
        },
        "battlesSeries2": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isInOrGroup": True,
                "groupID": 2,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(
                displayType=DISPLAY_TYPE.COUNTER, isInOrGroup=True
            ),
        },
    },
    "pm3_9_1_7": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 20000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["AT-SPG", "mediumTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        }
    },
    "pm3_9_1_8": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 30000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceInVisionRadius": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_9_1_9": {
        "topByKills": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 2},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "hitsFrequency": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 50,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TIMES_GET_DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_1_10": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 15000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.AVERAGE(
                iconID=CONDITION_ICON.DAMAGE, counterID="battlesSeries"
            ),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 22500,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.AVERAGE(
                iconID=CONDITION_ICON.DAMAGE, counterID="battlesSeriesAdv"
            ),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": False,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
    },
    "pm3_9_1_11": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_1_12": {
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 4},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "hitsFrequency": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 30,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetPierced": True, "attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_1_13": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackerWasInvisible": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_1_14": {
        "topByDamage1": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "groupID": 1,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "topByDamage2": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "groupID": 2,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "hitsFrequency": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 60,
                "isMain": True,
                "isAward": False,
                "groupID": 2,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TIMES_GET_DAMAGE),
        },
        "battlesSeries1": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isInOrGroup": True,
                "groupID": 1,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(
                displayType=DISPLAY_TYPE.COUNTER, isInOrGroup=True
            ),
        },
        "battlesSeries2": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isInOrGroup": True,
                "groupID": 2,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(
                displayType=DISPLAY_TYPE.COUNTER, isInOrGroup=True
            ),
        },
    },
    "pm3_9_1_15": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "killsAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "winAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_9_1_16": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 55,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        }
    },
    "pm3_9_1_17": {
        "assistedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 60,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO],
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        }
    },
    "pm3_9_1_18": {
        "assistedKills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 25,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        }
    },
    "pm3_9_1_19": {
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["SPG"]},
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.DISCOVER, limiterID="alive"
            ),
        },
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2500,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["SPG"]},
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.HURT_VEHICLES, limiterID="alive"
            ),
        },
    },
    "pm3_9_1_20": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2500,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3500,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_9_1_21": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 7},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_1_22": {
        "killsDiversity": {
            "type": PROGRESS_TEMPLATE.COUNTER,
            "config": {
                "uniqueGoal": 5,
                "totalGoal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_9_1_23": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_1_24": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_1_25": {
        "markOfMasteryI": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"markOfMastery": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.AWARD),
        },
        "markOfMasteryISeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 4,
                "battlesLimit": 20,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
        "markOfMasteryMaster": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"markOfMastery": 4},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.MASTER),
        },
        "markOfMasteryMasterSeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 5,
                "battlesLimit": 12,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_9_2_1": {
        "hitsReceived": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 120,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.GET_HIT),
        }
    },
    "pm3_9_2_2": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
    },
    "pm3_9_2_3": {
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_4": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 14,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceShortOrEqual": 150},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_9_2_5": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 2},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": False,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "spotNumberAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_9_2_6": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_7": {
        "killsDiversity": {
            "type": PROGRESS_TEMPLATE.COUNTER,
            "config": {
                "uniqueGoal": 2,
                "totalGoal": 4,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_8": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        }
    },
    "pm3_9_2_9": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 50,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_9_2_10": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True, "attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_9_2_11": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1500,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_12": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 23000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackerWasInvisible": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_9_2_13": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 12,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceGreatOrEqual": 300},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_9_2_14": {
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_15": {
        "piercingSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 2,
                "battlesLimit": 3,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_9_2_16": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_17": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        },
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 500,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetClasses": ["lightTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        },
    },
    "pm3_9_2_18": {
        "assistedKills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_19": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.ASSIST, limiterID="alive"
            ),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
    },
    "pm3_9_2_20": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 9,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"shouldBeUnspotted": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "xp": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1200,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.EXPERIENCE),
        },
    },
    "pm3_9_2_21": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 7},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 700,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_22": {
        "killsDiversity": {
            "type": PROGRESS_TEMPLATE.COUNTER,
            "config": {
                "uniqueGoal": 5,
                "totalGoal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_9_2_23": {
        "xp": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 600,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.EXPERIENCE),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_24": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_2_25": {
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 3,
                "battlesLimit": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
        "topByDamageAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "winAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 5,
                "battlesLimit": 10,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_9_3_1": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 35,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"], "targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        }
    },
    "pm3_9_3_2": {
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 300,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_3_3": {
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 75,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        }
    },
    "pm3_9_3_4": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceShortOrEqual": 150},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 15,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"], "targetLevelDiff": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
    },
    "pm3_9_3_5": {
        "damageDealtReceivedAndBlocked": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 12000,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.FOLDER),
        },
        "damageDealtReceivedAndBlockedAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 13000,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.FOLDER),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
    },
    "pm3_9_3_6": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_3_7": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 9,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["AT-SPG", "SPG", "mediumTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_9_3_8": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 15,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"critTypes": CRIT_TYPES.DESTROYED_TRACKS},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        }
    },
    "pm3_9_3_9": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 2},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_3_10": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1500,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "critsAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "assistedKillsAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 3,
                "battlesLimit": 10,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_9_3_11": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 14000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_9_3_12": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 15,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_9_3_13": {
        "damagePercent": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"damagedHealthPercent": 25, "uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_3_14": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 500,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_3_15": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6000,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6000,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_9_3_16": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 500,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "piercings": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_3_17": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        }
    },
    "pm3_9_3_18": {
        "damageAndAssist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1200,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_3_19": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 30,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 60,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
    },
    "pm3_9_3_20": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 18000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
        "assistAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 24000,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": False,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
    },
    "pm3_9_3_21": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 9},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.NO_DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_3_22": {
        "killsDiversity": {
            "type": PROGRESS_TEMPLATE.COUNTER,
            "config": {
                "uniqueGoal": 5,
                "totalGoal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_9_3_23": {
        "xp": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.EXPERIENCE),
        }
    },
    "pm3_9_3_24": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_9_3_25": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
        "topByExpAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_10_1_1": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 25000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        }
    },
    "pm3_10_1_2": {
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 32000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        }
    },
    "pm3_10_1_3": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 70,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
    },
    "pm3_10_1_4": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2000,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "hitsReceived": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.GET_HIT),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_1_5": {
        "damageDealtReceivedAndBlocked": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3500,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.FOLDER),
        },
        "damageDealtReceivedAndBlockedAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4000,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.FOLDER),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
    },
    "pm3_10_1_6": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 38000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceInVisionRadius": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_10_1_7": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 17000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetClasses": ["AT-SPG", "mediumTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.HURT_VEHICLES, limiterID="win"
            ),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_10_1_8": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True},
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.DAMAGE, limiterID="alive"
            ),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
    },
    "pm3_10_1_9": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"critTypes": CRIT_TYPES.INNER_MODULES_AND_TANKMEN},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.MODULE_CRIT),
        }
    },
    "pm3_10_1_10": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 750,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "critsAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "assistedKillsAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 3,
                "battlesLimit": 10,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_10_1_11": {
        "piercingSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 2},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_1_12": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 50,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.HIT, limiterID="topByDamage"
            ),
        },
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
    },
    "pm3_10_1_13": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 12,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.KILL_VEHICLES, limiterID="alive"
            ),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
    },
    "pm3_10_1_14": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1200,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_1_15": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2500,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2500,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_10_1_16": {
        "assistedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {
                    "assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO],
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.ASSIST, limiterID="kills"
            ),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
    },
    "pm3_10_1_17": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1500,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "assistTypes": [
                        ASSIST_TYPES.TRACK,
                        ASSIST_TYPES.RADIO,
                        ASSIST_TYPES.STUN,
                    ]
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "piercings": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_1_18": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1500,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        },
        "mileage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2000,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.METERS),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_1_19": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 60,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"shouldBeUnspotted": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        }
    },
    "pm3_10_1_20": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
        "assistAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10500,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": False,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
    },
    "pm3_10_1_21": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 7},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_1_22": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_1_23": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 30000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.DAMAGE, limiterID="kills"
            ),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
    },
    "pm3_10_1_24": {
        "topByKills": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 2},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_1_25": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
        "topByExpAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_10_2_1": {
        "hitsReceived": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 80,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.GET_HIT, limiterID="blockedDamage"
            ),
        },
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2000,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
    },
    "pm3_10_2_2": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 9,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 9000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
    },
    "pm3_10_2_3": {
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 55,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        }
    },
    "pm3_10_2_4": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 17,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"distanceShortOrEqual": 150},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_10_2_5": {
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "dynamicGoal": True,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"vehicleHealthFactor": 2.5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "blockedDamageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "dynamicGoal": True,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"vehicleHealthFactor": 2.5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_10_2_6": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackReasons": ["shot"], "distanceInVisionRadius": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_7": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["AT-SPG", "mediumTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.KILL_VEHICLES, limiterID="damage"
            ),
        },
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1500,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
    },
    "pm3_10_2_8": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.ASSIST_TRACK, limiterID="kills"
            ),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
    },
    "pm3_10_2_9": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["AT-SPG", "SPG"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_10": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 20000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.AVERAGE(
                iconID=CONDITION_ICON.DAMAGE, counterID="battlesSeries"
            ),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 35000,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.AVERAGE(
                iconID=CONDITION_ICON.DAMAGE, counterID="battlesSeriesAdv"
            ),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": False,
                "isAward": False,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.LIMITED),
        },
    },
    "pm3_10_2_11": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_12": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 20,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerWasInvisible": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_10_2_13": {
        "damagePercent": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"damagedHealthPercent": 30, "uniqueTarget": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_14": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 30000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_10_2_15": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "killsAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_10_2_16": {
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 45,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(
                iconID=CONDITION_ICON.DISCOVER, limiterID="alive"
            ),
        },
    },
    "pm3_10_2_17": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["SPG"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_18": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"shouldBeUnspotted": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_19": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3700,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetClasses": ["lightTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        }
    },
    "pm3_10_2_20": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5500,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6500,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_10_2_21": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 7},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 700,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_22": {
        "xp": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 700,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.EXPERIENCE),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_23": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "hitsReceivedLimit": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetPierced": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.GET_HIT),
        },
        "hitsReceived": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.GET_HIT),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_24": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"desiredPosition": 7},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"critTypes": CRIT_TYPES.DESTROYED_TRACKS},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_2_25": {
        "markOfMasteryI": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"markOfMastery": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.AWARD),
        },
        "markOfMasteryISeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 5,
                "battlesLimit": 20,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
        "markOfMasteryMaster": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"markOfMastery": 4},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.MASTER),
        },
        "markOfMasteryMasterSeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 5,
                "battlesLimit": 12,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_10_3_1": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 37,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"attackReasons": ["shot"], "targetClasses": ["heavyTank"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        }
    },
    "pm3_10_3_2": {
        "blockedDamage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 300,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_3": {
        "blockedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE_BLOCK),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_4": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "dynamicGoal": True,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"vehicleHealthFactor": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "hitsReceived": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.GET_HIT),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_5": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": True,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 2.5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "damageAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "isMain": False,
                "isAward": False,
                "dynamicGoal": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"vehicleHealthFactor": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "spotNumberAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.SERIES),
        },
    },
    "pm3_10_3_6": {
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"], "targetLevelDiff": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 9,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "isCumulative": True,
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_7": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "dynamicGoal": True,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"vehicleHealthFactor": 2},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_8": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 250,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_9": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 40,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"critTypes": CRIT_TYPES.ALL_MODULES},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.MODULE_CRIT),
        }
    },
    "pm3_10_3_10": {
        "crits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "critTypes": CRIT_TYPES.DESTROYED_TRACKS,
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_TRACK),
        },
        "hits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackReasons": ["shot"], "targetImmobilized": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HURT_VEHICLES),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"targetImmobilized": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
    "pm3_10_3_11": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 800,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"distanceGreatOrEqual": 300},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 3},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_12": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 20,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        }
    },
    "pm3_10_3_13": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 15000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackerWasInvisible": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        }
    },
    "pm3_10_3_14": {
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 6,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_15": {
        "piercingSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.HIT),
        },
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 3,
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 2,
                "battlesLimit": 3,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
    },
    "pm3_10_3_16": {
        "assistedHits": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 70,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {
                    "assistTypes": [ASSIST_TYPES.TRACK, ASSIST_TYPES.RADIO],
                    "uniqueTarget": True,
                },
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST),
        }
    },
    "pm3_10_3_17": {
        "assist": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 12000,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"assistTypes": [ASSIST_TYPES.RADIO]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.ASSIST_RADIO),
        }
    },
    "pm3_10_3_18": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"targetClasses": ["SPG"]},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_19": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 2,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"shouldBeUnspotted": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_20": {
        "spotNumber": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 10,
                "isMain": True,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"shouldBeUnspotted": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DISCOVER),
        },
        "win": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.SURVIVE),
        },
        "xp": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1200,
                "isMain": False,
                "isAward": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.EXPERIENCE),
        },
    },
    "pm3_10_3_21": {
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 8},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "alive": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"attackerUnharmed": True},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.NO_DAMAGE),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 4,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_22": {
        "xp": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 7500,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.EXPERIENCE),
        }
    },
    "pm3_10_3_23": {
        "damage": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "dynamicGoal": True,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
                "params": {"vehicleHealthFactor": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.DAMAGE),
        },
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 5},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_24": {
        "kills": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 1,
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.KILL_VEHICLES),
        },
        "topByExp": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 6},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.VALUE,
            "config": {
                "goal": 8,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.COUNTER),
        },
    },
    "pm3_10_3_25": {
        "topByDamage": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": True,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeries": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 4,
                "battlesLimit": 5,
                "isMain": True,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
        "topByDamageAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
                "params": {"desiredPosition": 1},
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.TOP),
        },
        "battlesSeriesAdv": {
            "type": PROGRESS_TEMPLATE.BIATHLON,
            "config": {
                "goal": 5,
                "battlesLimit": 10,
                "isMain": False,
                "isAward": True,
                "isCumulative": True,
                "visibleScope": [VISIBLE_SCOPE.BATTLE, VISIBLE_SCOPE.HANGAR],
            },
            "description": DESCRIPTIONS.HEADER(displayType=DISPLAY_TYPE.BIATHLON),
        },
        "winAdv": {
            "type": PROGRESS_TEMPLATE.BINARY,
            "config": {
                "isMain": False,
                "isAward": False,
                "visibleScope": [VISIBLE_SCOPE.HANGAR, VISIBLE_SCOPE.BATTLE],
            },
            "description": DESCRIPTIONS.REGULAR(iconID=CONDITION_ICON.WIN),
        },
    },
}

import json
def get_config():
    return json.dumps(config_pm3, indent=2, ensure_ascii=False)

def write_config_to_file(file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(get_config())

write_config_to_file('config.json')