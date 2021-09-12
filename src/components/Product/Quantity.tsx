import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export default function Quantity({ quantity, setQuantity }: { quantity: number; setQuantity: any }) {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 }
    ])

    return (
        <DropDownPicker
            listMode="SCROLLVIEW"
            setOpen={setOpen}
            open={open}
            value={quantity}
            items={items}
            setItems={setItems}
            containerStyle={styles.container}
            style={styles.dropDownPicker}
            labelStyle={styles.labelStyle}
            setValue={(item) => setQuantity(item)}
            zIndex={2}
            placeholder="Seleccionar la cantidad"
        />
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 100,
        marginBottom: 20
    },
    itemStyle: {
        justifyContent: 'flex-start'
    },
    dropDownPicker: {
        backgroundColor: '#fafafa'
    },
    labelStyle: {
        color: 'black'
    }
})
