import React , { useState } from 'react';
import { StyleSheet, View,  ScrollView, Picker ,RefreshControl} from 'react-native';
import {API_URL} from "@env"
import axios from 'axios';
import { Spinner,  Card, Button, Input } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function App({navigation}){
    
    const [auth, setAuth]= useState("")
    const [refreshing, setRefreshing] = React.useState(false);
    const [isSave, setisSave] = useState(false)
    const [email, setEmail] = useState("")
    const [nohp, setNohp] = useState("")
    const [gender, setGender] = useState("")
    const [fullname, setFullname] = useState("")
    const [address, setAddress] = useState("")
    const [isload, setIsload] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            cek()
        }, [auth])
    );

    const cek = async() => {
        setAuth(await AsyncStorage.getItem('auth'))
        getData()
    }

    const indikator = (props) => {
        return isSave ? (
        <View style={[props.style, styles.indicator]}>
            <Spinner size='large' status='success'/>
        </View>                     
        ) : null
    }

    const getData = () => {
        axios.get(`${API_URL}/site/getdata?token=${auth}`).then((respons)=>{
            setAddress(respons.data.address)
            setEmail(respons.data.email)
            setFullname(respons.data.fullname)
            setGender(respons.data.gender)
            setNohp(respons.data.no_hp)
            setIsload(true)
        }).catch((E) => setIsload(false))
    }

    const Simpan = () =>{
        let data = new FormData();
        //data.append('authKey', auth)
        data.append('no_hp', nohp)
        data.append('email', email)
        data.append('fullname', fullname);
        data.append('address', address);
        data.append('gender', gender);

        setisSave(true)
        axios.post(`${API_URL}/site/ubah?token=${auth}`, data).then((res) => {
            if(res.data.status == 1){
                alert(res.data.message)
                setisSave(false)
                navigation.navigate('Akun')
            }else{
                alert(res.data.message)
                setisSave(false)
            }
        })
    }


    const setHp = (val) => {
        setNohp(val)
    }
    const setMail = (val) => {
        setEmail(val)
    }
    const setFname = (val)=>{
        setFullname(val)
    }
    const setAlamat = (val) => {
        setAddress(val)
    }


    return isload ?  (
        <ScrollView
            refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            }>

            <View style={{marginHorizontal:8, marginVertical:5, justifyContent:'center', flex:1}}>
                <Card>
                        <View>
                           
                            <Input
                                style={{margin:2}}
                                placeholder='Email'
                                value={email}
                                onChangeText={val=>setMail(val)}
                            />
                            <Input
                                style={{margin:2}}
                                placeholder='Full Name'
                                value={fullname != 'null' ? fullname:''}
                                onChangeText={val=>setFname(val)}
                            />
                            <Input
                                style={{margin:2}}
                                placeholder='Alamat'
                                value={address != 'null' ? address : ''}
                                multiline={true}
                                onChangeText={val=>setAlamat(val)}
                            />
                            <View style={{backgroundColor:'#f7f9fc', borderRadius:4, height:42}}>
                                <Picker
                                    selectedValue={gender}
                                    style={{ height: 50, width: '100%' ,padding:5}}
                                    prompt={"Pilih Jenis kelamin"}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                                >
                                    <Picker.Item label='Pilih Jenis kelamin' value='' />
                                    <Picker.Item label="Laki-Laki" value="Laki-Laki" />
                                    <Picker.Item label="Perempuan" value="Perempuan" />
                                </Picker>
                            </View>
                            

                            {isSave ? (
                                <Button  status='success' onPress={() => Simpan()} style={{marginTop:20}}  accessoryLeft={indikator}  disabled={true} >
                                Menyimpan
                                </Button>
                            ):(
                                <Button  status='success' onPress={() => Simpan()} style={{marginTop:20}}   accessoryLeft={indikator} >
                                    Simpan
                                </Button>
                            )}
                        </View>
                    
                </Card>
                
            </View>
        </ScrollView>
    ):(
            <View style={{justifyContent: 'center', alignItems:'center', flex:1, backgroundColor:'#fff', borderRadius:50}}>
                <Spinner status='success'/>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      maxHeight: 200,
    },
});

export default App;