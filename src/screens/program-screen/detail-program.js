import React , { useEffect, useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import {API_URL} from "@env"
import axios from 'axios';
import { Spinner, Text, Card} from '@ui-kitten/components';

function App({route}){
    const [data, setData] = useState([])
    const [isload, setIsload] = useState(false)

    const Footer = (props) => (
        <View {...props} style={{ padding:5, marginHorizontal:2}}>
            {data.map((val) => {
                return (
                    <View>
                        <Text status='success' category='h6' style={{fontWeight:'bold'}}>{val.judul}</Text>
                        <Text appearance='hint' style={{textAlign: 'justify'}}>{val.isi}</Text>
                    </View>
                )
            })}
        </View>
    );

    useEffect(() => {
        axios.get(`${API_URL}/program/detail?id=${route.params.id}`).then((res)=>{
            setData(res.data)
            setIsload(true)
        })
    })

    return isload ? (
        <FlatList
            data={data}
            keyExtractor={(index) => index}
            renderItem={({item})=>{
            return (
                <View style={{marginHorizontal:8,  marginBottom:2, marginVertical:5}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex: 5}}>
                            <Card footer={Footer}>
                                    <Image
                                        resizeMode='contain'
                                        style={{height:200, borderRadius:5}}
                                        source={{ uri: item.gambar}}
                                    />
                                
                            </Card>
                        </View>
                    </View>
                </View>
            )
        }}
        />
    ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
    )
}

export default App