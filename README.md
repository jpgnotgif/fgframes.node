# frda.js

A proof of concept http web service providing frame data for Ultra
Street Fighter 4 and Street Fighter V. My data is brought to you by the
great [ToolAssisted](https://github.com/toolassisted)

## What's frame data?

Quick Summary (NOT a tl;dr): The 2 games above run at ~60 frames per second (fps). Each attack runs at some number of frames during a game. This service will yield you the number of frames for all moves given a character.

[Read this for a detailed explanation](http://forums.shoryuken.com/discussion/106615/basic-frame-data-guide-for-newbies)

## Why was this built?

My reasons are many.

  1. I want a programatic way to access frame data for the games that I :heart to play.
  2. I want a way to expose myself to unused technolog(y||ies)
  3. I want to apply the data in new and unique ways

## Bootstrap

  1. Install node
  2. Install npm
  3. Install packages from ```package.json```
  4. Run ```npm start```

## Getting data

After bootstrapping and starting the server, you can make http requests using common http utilities. Below is an example request with curl and assumes you started the server on port 3000.

```curl http://localhost:3000/sfv/s2/ryu```

## What did I just get back?

So, let's say we run the curl command above. This is a snippet of what you got back:

```
  {
    "metadata": {
      "health" : "1000",
      "stun" : "1000"
    },
    "attacks": {
      "st_mp" : {
        "command": null,
        "damage": "60",
        "chip_damage": "10",
        "attack_level": "h",
        "stun": "100",
        "cancel_ability": "sp",
        "frames": {
          "startup": "5",
          "active": "3",
          "recovery": "10",
          "block_advantage": "1",
          "hit_advantage": "6",
          "counter_hit_advantage": "8",
          "counter_hit_damage": "8",
          "counter_hit_stun": "72",
          "knockdown_advantage": "120",
          "knockdown_recovery_advantage": null,
          "knockdown_recovery_back_advantage": null
        }
      },
      ...
    }
  }
```


There's 2 top level keys. ```metadata``` contains the health and stun values of the given character. ```attacks``` contain a collection of key-value pairs where the keys are abbreviated and non-abbreviated attack names. The values contain metadata specific to the attack. Most attack frame state names (```startup```,```active```,etc...) are spelled out, but certain values may be abbreviated. Below is a key for abbreviated values

| Abbreviation | Value    |
| ------------ | -------- |
| st           | standing |
| cr           | crouching |
| lp           | light punch |
| mp           | medium punch |
| hp           | heavy punch |
| lk           | light kick |
| mk           | medium kick |
| hk           | heavy kick
| ex           | ex (uses 2 of either punch or kick) |
| j            | neutral jump |
| jf           | jump forward |
| jb           | jump backward |
| h            | high |
| sp           | special (cancelable) |
| v            | v-trigger (cancelable) |

## Note

This project is WIP and I welcome any and all bug/issue reports. Should you wish to file an issue, please file via GitHub.
