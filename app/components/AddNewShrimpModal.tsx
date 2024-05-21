import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const AddNewShrimpModal = () => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => setVisible(!visible);
  return (
    <View>
      <Text>AddNewShrimpModal</Text>
    </View>
  )
}

export default AddNewShrimpModal

const styles = StyleSheet.create({})