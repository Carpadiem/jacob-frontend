export default {
    "headerState": {
      "projectName": "C:\\Users\\User\\Desktop\\vfx_exhaust_smoke",
      "version": {
        "loading": false,
        "error": null,
        "data": {
          "version": "1.0.8-alpha"
        }
      },
      "release": {
        "loading": false,
        "error": null,
        "data": null
      },
      "shouldShowReleaseDownloadDialog": false
    },
    "particleSystemState": {
      "preParticles": 500,
      "integrationType": "EULER",
      "emitters": [
        {
          "id": "a10ae280-81ba-11ef-9bb3-69ee3736a79c",
          "totalEmitTimes": 100,
          "life": 5,
          "cache": {
            "totalEmitTimes": 0,
            "life": 0
          },
          "rate": {
            "particlesMin": 1,
            "particlesMax": 5,
            "perSecondMin": 0.01,
            "perSecondMax": 0.02
          },
          "position": {
            "x": .6,
            "y": .48,
            "z": 2.3
          },
          "rotation": {
            "x": 0,
            "y": 0,
            "z": 0
          },
          "initializers": [
            {
              "id": "a10ae281-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Mass",
              "properties": {
                "min": 5,
                "max": 5,
                "isEnabled": true,
                "center": true
              }
            },
            {
              "id": "a10ae282-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Life",
              "properties": {
                "min": .4,
                "max": .4,
                "isEnabled": true
              }
            },
            {
              "id": "a10ae283-81ba-11ef-9bb3-69ee3736a79c",
              "type": "BodySprite",
              "properties": {
                "texture": "/assets/textures/smoke.png",
                "isEnabled": true
              }
            },
            {
              "id": "a10ae284-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Radius",
              "properties": {
                "width": 4,
                "height": 4,
                "isEnabled": true
              }
            },
            {
              "id": "a10ae285-81ba-11ef-9bb3-69ee3736a79c",
              "type": "RadialVelocity",
              "properties": {
                "radius": .7,
                "x": 0,
                "y": 0,
                "z": .5,
                "theta": 70,
                "isEnabled": true
              }
            }
          ],
          "behaviours": [
            {
              "id": "a10ae286-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Alpha",
              "properties": {
                "alphaA": .5,
                "alphaB": 0,
                "life": null,
                "easing": "easeLinear"
              }
            },
            {
              "id": "a10ae287-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Color",
              "properties": {
                "colorA": "#1a1a1a",
                // "colorA": "#ff0000",
                "colorB": "#000000",
                "life": null,
                "easing": "easeLinear"
              }
            },
            {
              "id": "a10ae288-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Scale",
              "properties": {
                "scaleA": .1,
                "scaleB": .5,
                "life": null,
                "easing": "easeLinear"
              }
            },
            {
              "id": "a10ae289-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Force",
              "properties": {
                "fx": 0,
                "fy": 0,
                "fz": 0.1,
                "life": null,
                "easing": "easeLinear"
              }
            },
            {
              "id": "a10ae28a-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Rotate",
              "properties": {
                "x": 0,
                "y": 0,
                "z": 0,
                "life": null,
                "easing": "easeLinear"
              }
            },
            {
              "id": "a10ae28b-81ba-11ef-9bb3-69ee3736a79c",
              "type": "RandomDrift",
              "properties": {
                "driftX": 0,
                "driftY": 0,
                "driftZ": 0,
                "delay": 1,
                "life": null,
                "easing": "easeLinear"
              }
            },
            {
              "id": "a10ae28c-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Spring",
              "properties": {
                "x": 0,
                "y": 5,
                "z": 30,
                "spring": 0.001,
                "friction": 1,
                "life": null,
                "easing": "easeLinear"
              }
            }
          ],
          "emitterBehaviours": [
            {
              "id": "a10ae28d-81ba-11ef-9bb3-69ee3736a79c",
              "type": "Rotate",
              "properties": {
                "x": 0,
                "y": 0,
                "z": 0,
                "life": null,
                "easing": "easeLinear"
              }
            }
          ]
        }
      ]
    }
  }