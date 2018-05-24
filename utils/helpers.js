import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'UdaciCards:Happyplaying:Notifications'

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Quiz Time !',
    body: "👋 Let's have fun with some quiz!",
    ios: {
        sound: true,
    },
  }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
            .then((data) => {
                if (data === null) {
                    Permissions.askAsync(Permissions.NOTIFICATIONS)
                        .then(({ status }) => {
                            if (status === 'granted') {
                                Notifications.cancelAllScheduledNotificationsAsync()
                                // lets remind at 8pm every day
                                let tomorrow = new Date()
                                tomorrow.setDate(tomorrow.getDate() + 1)
                                tomorrow.setHours(20)
                                tomorrow.setMintutes(0)
                                Notifications.scheduleLocalNotificationsAsync(
                                    createNotification(),
                                    {
                                        time: tomorrow,
                                        repeat: 'day',
                                    }
                                )
                                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                            }
                        })
                }
            })
}