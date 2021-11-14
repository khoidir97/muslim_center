import React , { useState } from 'react';
import { StyleSheet, View, ScrollView,RefreshControl,TouchableWithoutFeedback} from 'react-native';
import {API_URL} from "@env"
import axios from 'axios';
import { Spinner, Card, Button, Icon,Input } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function App({navigation}){
    
    const [auth, setAuth]= useState("")
    const [refreshing, setRefreshing] = React.useState(false);
    const [isSave, setisSave] = useState(false)
    const [newpassword, setNewpassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const [password, setPassword] = useState("")
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

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


    const Simpan = () =>{

        if (!password.trim()) {
            alert('Please Enter Password Lama');
            return;
        }
        if (!newpassword.trim()) {
            alert('Please Enter Password Baru');
            return;
        }
        if (!confirmpassword.trim()) {
            alert('Please Enter Konfirmasi Password');
            return;
        }

        let data = new FormData();
        data.append('password', newpassword);

        let cekpassword = new FormData();
        cekpassword.append('password', password)

        setisSave(true)
        axios.post(`${API_URL}/site/validatepassword?token=${auth}`, cekpassword).then((respon) => {
            if(respon.data.status == 1){
                if(newpassword == confirmpassword){
                    setisSave(true)
                    axios.post(`${API_URL}/site/change-password?token=${auth}`, data).then((res) => {
                        if(res.data.status == 1){
                            alert(res.data.message)
                            setisSave(false)
                            navigation.navigate('Akun')
                        }else{
                            alert(res.data.message)
                            setisSave(false)
                        }
                    })
                }else{
                    setisSave(false)
                    alert('password tidak sesuai');
                }
            }else{
                setisSave(false)
                alert(respon.data.message)
            }
        }).catch((e) => setisSave(false))
        
    }

  

    return (
        <ScrollView
            refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            }>

            <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                <Card>
                    <View>
                        <Input
                            style={{margin:2}}
                            placeholder='Password lama'
                            value={password}
                            accessoryRight={renderIcon}
                            secureTextEntry={secureTextEntry}
                            onChangeText={nextValue => setPassword(nextValue)}
                        />
                        <Input
                            style={{margin:2}}
                            placeholder='Password baru'
                            value={newpassword}
                            accessoryRight={renderIcon}
                            secureTextEntry={secureTextEntry}
                            onChangeText={nextValue => setNewpassword(nextValue)}
                        />
                        <Input
                            style={{margin:2}}
                            placeholder='Konfirmasi password baru'
                            value={confirmpassword}
                            accessoryRight={renderIcon}
                            secureTextEntry={secureTextEntry}
                            onChangeText={nextValue => setConfirmpassword(nextValue)}
                        />
                        

                        {isSave ? (
                            <Button  status='success' onPress={() => Simpan()} style={{marginTop:10}}  accessoryLeft={indikator}  disabled={true} >
                            Updating
                            </Button>
                        ):(
                            <Button  status='success' onPress={() => Simpan()} style={{marginTop:10}}   accessoryLeft={indikator} >
                                Update
                            </Button>
                        )}
                    </View>
                </Card>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      maxHeight: 200,
    },
});

export default App;