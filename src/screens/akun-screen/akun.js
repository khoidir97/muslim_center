import React , {useState } from 'react';
import { View, FlatList} from 'react-native';
import {API_URL} from "@env"
import axios from 'axios';
import { Spinner, Text, Card, Button, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function App({navigation}){
    const [auth, setAuth]= useState("")
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([])
    const [isload, setIsload] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            cekauth()
        }, [auth])
    );

    const cekauth = async() => {
        setAuth(await AsyncStorage.getItem('auth'))
        axios.get(`${API_URL}/site/gettoken?token=${auth}`).then((res)  => {
            
            setData(res.data.data)
            setIsload(true)
        })
    }

    const logOut=()=>{
        AsyncStorage.clear();
        alert('Anda telah logout')
        setAuth() 
    }            

    const phoneIcon = (props) => (
        <Icon {...props} name='power'/>
    );

    const editIcon = (props) => (
        <Icon {...props} name='edit-2'/>
    );

    const lockIcon = (props) => (
        <Icon {...props} name='lock-outline'/>
    );

   if(auth){
        return isload ? (
            <View style={{marginHorizontal:8, marginVertical:5}}>
            <Card>
                <View style={{flexDirection:'row', width:'100%'}}>
                    <View style={{flexDirection:'column', width:'85%'}}>
                    </View>
                    <View style={{flexDirection:'column', width:'15%'}}>
                        <Button status="success" appearance="outline" size="small" onPress={() => navigation.navigate('Update')} accessoryLeft={editIcon}/>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={data}
                        keyExtractor={index => index}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        renderItem={({item})=>{
                            return(
                                <>
                                <View style={{flexDirection:'row', padding:10}}>
                                    <Icon
                                        name='email'
                                        style={{height:20, width:20, marginRight:10}}
                                        fill='grey'
                                    />
                                    <Text style={{paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#f7f9fc'}}>
                                    {item.email}</Text>
                                </View>
                                <View style={{flexDirection:'row', padding:10}}>
                                    <Icon
                                        name='phone'
                                        style={{height:20, width:20, marginRight:10}}
                                        fill='grey'
                                    />
                                    <Text style={{paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#f7f9fc'}}>{item.nohp}</Text>
                                </View>
                                <View style={{flexDirection:'row', padding:10}}>
                                    <Icon
                                        name='person-done'
                                        style={{height:20, width:20, marginRight:10}}
                                        fill='grey'
                                    />
                                    <Text style={{paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#f7f9fc'}}>{item.fullname != 'null' ? item.fullname : '-'}</Text>
                                </View>
                                <View style={{flexDirection:'row', padding:10}}>
                                    <Icon
                                        name='award'
                                        style={{height:20, width:20, marginRight:10}}
                                        fill='grey'
                                    />
                                    <Text style={{paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#f7f9fc'}}>{item.gender != 'null' ? item.gender : '-'}</Text>
                                </View>
                                <View style={{flexDirection:'row', padding:10}}>
                                    <Icon
                                        name='map'
                                        style={{height:20, width:20, marginRight:10}}
                                        fill='grey'
                                    />
                                    <Text style={{paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#f7f9fc'}}>{item.address != 'null' ? item.address : '-' }</Text>
                                </View>
                                </>
                            )
                        }}
                    />

                
                    <Button  status='danger' onPress={() => logOut()}  accessoryLeft={phoneIcon}>
                        Logout
                    </Button>
                    <Button  status='success' onPress={() => navigation.navigate('Ubah Password')}  appearance='outline'  accessoryLeft={lockIcon} style={{marginTop:10}}>
                        Ubah Password
                    </Button>
                </View>
            </Card>
        
    </View>
       ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
       )
   }else{
        return (
            <View style={{marginHorizontal:10, marginVertical:5}}>
                <Card>
                    <Text style={{paddingBottom:10, fontWeight:'bold', textAlign:'center'}} status='info'>Anda Belum login</Text>
                    <Button  status='success' onPress={()=> navigation.navigate('Login')}>
                        Login 
                    </Button>
                </Card>
            </View>
        )
   }
}



export default App;