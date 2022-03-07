import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import {getPacientes} from "../api"

const HomeScreen = () => {

    const loadPaciente = async ()=>{
        const data = await getPacientes();
        console.log(data)
    }

    useEffect(()=> {
        loadPaciente()
    }, [])
    return (
        <View>
            <Text>homeScreen</Text>
        </View>
    )
}

export default HomeScreen