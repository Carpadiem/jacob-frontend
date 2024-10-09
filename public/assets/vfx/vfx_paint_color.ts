export default {
    "headerState": {
      "projectName": "C:\\Users\\User\\Desktop\\vfx_paint_color",
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
          "id": "61da53a0-8072-11ef-9fc3-45a02df094d0",
          "totalEmitTimes": 1,
          "life": .75,
          "cache": {
            "totalEmitTimes": 1,
            "life": .75
          },
          "rate": {
            "particlesMin": 5,
            "particlesMax": 10,
            "perSecondMin": 0.05,
            "perSecondMax": 0.5
          },
          "position": {
            "x": 0,
            "y": 1,
            "z": 0
          },
          "rotation": {
            "x": 0,
            "y": 0,
            "z": 0
          },
          "initializers": [
            {
              "id": "61da53a1-8072-11ef-9fc3-45a02df094d0",
              "type": "Mass",
              "properties": {
                "min": 2,
                "max": 4,
                "isEnabled": true,
                "center": true
              }
            },
            {
              "id": "61da53a2-8072-11ef-9fc3-45a02df094d0",
              "type": "Life",
              "properties": {
                "min": 1,
                "max": 2,
                "isEnabled": true,
                "center": false
              }
            },
            {
              "id": "61da53a3-8072-11ef-9fc3-45a02df094d0",
              "type": "BodySprite",
              "properties": {
                "texture": "/assets/textures/smoke.png",
                "isEnabled": true
              }
            },
            {
              "id": "61da53a4-8072-11ef-9fc3-45a02df094d0",
              "type": "Radius",
              "properties": {
                "width": 1.5,
                "height": 1.5,
                "isEnabled": true,
                "center": true
              }
            },
            {
              "id": "61da53a5-8072-11ef-9fc3-45a02df094d0",
              "type": "RadialVelocity",
              "properties": {
                "radius": 0.5,
                "x": 1,
                "y": 1,
                "z": 1,
                "theta": 30,
                "isEnabled": true
              }
            }
          ],
          "behaviours": [
            {
              "id": "61da53a6-8072-11ef-9fc3-45a02df094d0",
              "type": "Alpha",
              "properties": {
                "alphaA": .8,
                "alphaB": 0,
                "life": null,
                "easing": "easeInCubic"
              }
            },
            {
              "id": "61da53a7-8072-11ef-9fc3-45a02df094d0",
              "type": "Color",
              "properties": {
                "colorA": "#000000",
                "colorB": "#98591a",
                "life": null,
                "easing": "easeInOutQuad"
              }
            },
            {
              "id": "61da53a8-8072-11ef-9fc3-45a02df094d0",
              "type": "Scale",
              "properties": {
                "scaleA": 1.2,
                "scaleB": 1.6,
                "life": null,
                "easing": "easeLinear"
              }
            },
            {
              "id": "61da7ab0-8072-11ef-9fc3-45a02df094d0",
              "type": "Force",
              "properties": {
                "fx": 0,
                "fy": 0.005,
                "fz": 0,
                "life": null,
                "easing": "easeInOutQuad"
              }
            },
            {
              "id": "61da7ab1-8072-11ef-9fc3-45a02df094d0",
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
              "id": "61da7ab2-8072-11ef-9fc3-45a02df094d0",
              "type": "RandomDrift",
              "properties": {
                "driftX": 0,
                "driftY": 0,
                "driftZ": 0,
                "delay": 0.2,
                "life": null,
                "easing": "easeInCubic"
              }
            },
            {
              "id": "61da7ab3-8072-11ef-9fc3-45a02df094d0",
              "type": "Spring",
              "properties": {
                "x": 0,
                "y": 0,
                "z": 0,
                "spring": 0.01,
                "friction": 1,
                "life": null,
                "easing": "easeInOutCubic"
              }
            }
          ],
          "emitterBehaviours": [
            {
              "id": "61da7ab4-8072-11ef-9fc3-45a02df094d0",
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