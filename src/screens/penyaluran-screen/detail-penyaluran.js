import React , { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Image, RefreshControl, TouchableOpacity } from 'react-native';
import {API_URL, GAMBAR} from "@env"
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { Spinner, Text, Card, Modal } from '@ui-kitten/components';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
function App({route}){
    const [target, setTarget] = useState("")
    const [tema, setTema] = useState("")
    const [jumlah, setJumlah] = useState("")
    const [bentukpenyaluran, setBentukpenyaluran] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [linkvideo, setLinkvideo] = useState("")
    const [jmlgaleri, setJmlgaleri] = useState(0)
    const [gambarpenyaluran, setGambarpenyaluran] = useState([])
    const [iddetail, setIddetail] = useState(0)
    const [isload, setIsload] = useState(false)
    const kosong = `${GAMBAR}/noimage.png`;
    const [visible, setVisible] = useState(false);
    const [gambarmodal, setGambarmodal] = useState("")
    const video = `https://www.youtube.com/embed/${youtube_parser(linkvideo)}`;

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {

        axios.get(`${API_URL}/penyaluran/detail?id=${route.params.id}`).then((res)=>{
            
            setTarget(res.data.target)
            setTema(res.data.tema)
            setJumlah(res.data.jumlah)
            setBentukpenyaluran(res.data.bentuk_penyaluran)
            setTanggal(res.data.tanggal)
            setLinkvideo(res.data.video)
            setIddetail(res.data.id_detail_penyaluran)
            setJmlgaleri(res.data.jumlahgaleri)
            setIsload(true)
            
        }).catch(() => {setIsload(false);})


        axios.get(`${API_URL}/penyaluran/gambardetailpenyaluran?id=${iddetail}`).then((res)=>{
            
            setGambarpenyaluran(res.data)
            
            
        })
        
    })

    function youtube_parser(url){
        var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
        var match = url.match(regExp);
        return (match && match[1].length==11)? match[1] : false;
    }

        return isload ? (
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                }
            >
                <View style={{ marginTop:5, marginHorizontal:5}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex: 1}}>
                            <Card>
                                <Text style={{borderBottomWidth:1, borderBottomColor:'#cecece', padding:10, fontWeight:'bold'}}>Tema : {tema}</Text>
                                <Text style={{borderBottomWidth:1, borderBottomColor:'#cecece', padding:10}}>Target Penyaluran : {target}</Text>
                                <Text style={{borderBottomWidth:1, borderBottomColor:'#cecece', padding:10}}>Bentuk Penyaluran : {bentukpenyaluran}</Text>
                                <Text style={{borderBottomWidth:1, borderBottomColor:'#cecece', padding:10}}>Jumlah : {jumlah}</Text>
                                <Text style={{borderBottomWidth:1, borderBottomColor:'#cecece', padding:10, color: 'grey'}}>Tanggal Penyaluran : {tanggal}</Text>
                            </Card>
                        </View>
                    </View>
                </View>
                    
                {gambarpenyaluran.length > 0 ? (
                <>
                <View style={{marginHorizontal : 5, marginTop:5}}>
                    <Card>
                        <Text style={{fontWeight:'bold'}} status='success'>Galeri {tema} ({jmlgaleri})</Text> 
                    </Card>
                    
                </View>
                
                        <FlatList
                        data={gambarpenyaluran}
                        horizontal
                        pagingEnabled
                        bounces={false}
                        keyExtractor={(index,item) => index.id_detail_penyaluran}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>{
                        return (
                            <View style={{marginHorizontal:5}}>
                                <Card>
                                    <TouchableOpacity onPress={() => {
                                            setVisible(true); 
                                            setGambarmodal(item.gambar);
                                    }}>
                                        <Image
                                            source={{uri: item.thumbnail}}
                                            style={{height:150, width:300, borderRadius:5}}
                                        />
                                    </TouchableOpacity>
                                </Card>
                            </View>
                        )
                        }}
                    />
                    </>
                ):null}
                
                <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setVisible(false)}>
                        <View>
                            <Image
                                resizeMode='contain'
                                style={{width:300, height:300, borderRadius:5}}
                                source={{ uri: gambarmodal}}
                            />
                        </View>                      
                </Modal>
                {linkvideo ? (
                    <View style={{flex:1,backgroundColor:'#fff', marginBottom:10, borderRadius:5}}>
                        <View style={{marginHorizontal:5, margin:5}}>
                            <Text style={{fontWeight:'bold'}} status='success'>Video penyaluran</Text>
                        </View>
                        <View>
                            <WebView
                                style={{height:200}}
                                javaScriptEnabled={true}
                                source={{
                                uri: video,
                                }}
                            />
                            
                        </View>
                    </View>
                ):null}
                
            </ScrollView>
        ):(
            <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
                <Spinner status='success'/>
            </View>
        )

        
    
    
}

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    container: {
        minHeight: 192,
      },
      backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
});


export default App