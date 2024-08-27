import { State, Trigger } from "wotstat-widgets-sdk"

type Vector3 = { x: number, y: number, z: number, }

declare global {
  interface WidgetsSdkExtensions {
    wotstat: {
      onShotBallisticEvent: Trigger<{
        gravity: number,
        gunPoint: Vector3,
        shellSpeed: number,
        tracerStart: Vector3,
        tracerVel: Vector3,
        clientMarkerPoint: Vector3,
        clientShotDispersion: number,
        serverMarkerPoint: Vector3,
        serverShotDispersion: number
      }>
      onEvent: Trigger<object>
      version: State<string>
    }
  }
}