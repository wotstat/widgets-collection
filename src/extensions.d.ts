import { State, Trigger } from "wotstat-widgets-sdk"

declare global {
  interface WidgetsSdkExtensions {
    wotstat: {
      onEvent: Trigger<object>
    }
  }
}