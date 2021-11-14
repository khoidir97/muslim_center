import React , { useEffect, useState } from 'react';
import { View, FlatList ,TouchableOpacity } from 'react-native';
import {API_URL} from "@env"
import axios from 'axios';
import { Spinner, Text, Avatar} from '@ui-kitten/components';

function App({navigation}){
    const [data, setData] = useState([])
    const [isload, setIsload] = useState(false)

    useEffect(()=>{
        axios(`${API_URL}/program`).then((res) => {
            setData(res.data)
            setIsload(true)
        }).catch((e) => alert(e))
    },[])

    return isload ? (
        <View style={{marginHorizontal:5, backgroundColor:'#fff', marginVertical:5}}>
            <FlatList
                data={data}
                numColumns={4}
                keyExtractor={(index) => index}
                renderItem={({item})=>{
                return (
                    <View style={{flex:1, marginHorizontal:5, borderRadius:5}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Detail Program',{id: item.id_program})} >
                            <View style={{alignItems:'center', margin:5}}>
                                <View style={{backgroundColor:'#e2e4e6', height:45, width:45, alignItems:'center', justifyContent:'center', borderRadius:100}}>
                                    <Avatar
                                        style={{height:30, width: 30, borderRadius:100}}
                                        resizeMode={'cover'}
                                        source={{ uri: item.ikon}} />
                                </View>
                                <Text>{item.judul}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                }}
            />
        </View>
        
    ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
    )
}


export default App;