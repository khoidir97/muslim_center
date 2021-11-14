import React , { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Image,  TouchableOpacity} from 'react-native';
import {API_URL, GAMBAR} from "@env"
import axios from 'axios';
import { Spinner, Text, Card,  Modal, Icon} from '@ui-kitten/components';

const App = ({route})=>{
    const [visible, setVisible] = useState(false);
    const [gambarmodal, setGambarmodal] = useState("");
    const [data, setData] = useState([]);
    const [isload, setIsload] = useState(false);
    const [galeri, setGaleri] = useState([]);
    const [programunggulan, setProgramunggulan] = useState([])
    const [prestasi, setPrestasi] = useState([])
    const [jumlahguru, setJumlahguru] = useState("");
    const [jumlahsantri, setJumlahsantri] = useState("")
    const [hafalan, setHafalan] = useState("")


    const getApi = () => {
         axios.get(`${API_URL}/mitra/detail?id=${route.params.id}`).then((res)=>{
            setData(res.data.apimitra);
            setPrestasi(res.data.apiprestasi);
            setProgramunggulan(res.data.apiprogram);
            setJumlahguru(res.data.apiguru);
            setJumlahsantri(res.data.apisantri);
            setGaleri(res.data.apigaleri);
            setHafalan(res.data.hafalan);
            setIsload(true)
        })
    }
    useEffect(()=>{
        getApi();
    },[]);

    const Header = (props) => (
        <View {...props} style={{flexDirection:'row', padding:10, backgroundColor:'#00e096'}}>
            <Icon name='award-outline' style={{width:25, height:25}} fill='white'/>
            <Text category='h6' style={{fontWeight:'bold',paddingLeft:5, color:'white'}}>Prestasi</Text>
        </View>
      );

      const HeaderProgram = (props) => (
        <View {...props} style={{flexDirection:'row', padding:10, backgroundColor:'#00e096'}}>
            <Icon name='star-outline' style={{width:25, height:25}} fill='white'/>
          <Text category='h6'  style={{fontWeight:'bold',paddingLeft:5, color:'white'}}>Program Unggulan</Text>
        </View>
      );

    return isload ? (
        <ScrollView>

            <View style={{backgroundColor:'white', marginHorizontal:5, marginBottom:2, borderRadius:4}}>
                <Image
                    resizeMode='contain'
                    style={{height:200}}
                    source={{ uri: data.thumbnail}}
                />
                <View style={{backgroundColor:'#00e096', padding:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='home-outline' style={{width:20, height:20}} fill='white'/>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:18, paddingLeft:5, paddingRight:5}}>{data.nama}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='calendar-outline' style={{width:20, height:20}} fill='white'/>
                        <Text style={{color:'white', paddingLeft:5, paddingRight:5}}>Bergabung : {data.tanggal}</Text>
                    </View>
                    <View style={{flexDirection:'row', paddingRight:5}}>
                        <Icon name='book-outline' style={{width:20, height:20}} fill='white'/>
                        <Text style={{color:'white', paddingLeft:5, paddingRight:5}}>Metode Pengajaran : {data.metode_pengajaran}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='map-outline' style={{width:20, height:20}} fill='white'/>
                        <Text style={{color:'white', fontSize:12, paddingLeft:5, paddingRight:5}}>{data.alamat}</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginHorizontal:5, marginBottom:2}}>
                <Card>
                    <View  style={{flexDirection:'row'}}>
                        <View style={{width:'33%'}}>
                            <Icon
                                name='person-add-outline'
                                style= {{height:25, with:25}}
                                fill= '#00e096'
                            />
                            <Text style={{textAlign:'center', fontWeight:'bold'}}>{jumlahguru.length}</Text>
                            <Text style={{textAlign:'center'}} status='success'> Jumlah Guru </Text>
                        </View>
                        <View style={{width:'33%'}}>
                        
                            <Icon
                                name='book-open-outline'
                                style= {{height:25, with:25}}
                                fill= '#00e096'
                            />
                            <Text style={{textAlign:'center', fontWeight:'bold'}}>{hafalan ? hafalan+" Juz" : "-"}</Text>
                            <Text style={{textAlign:'center'}} status='success'> Hafalan Terbanyak </Text>
                        </View>
                        <View style={{width:'33%'}}>
                        
                            <Icon
                                name='person-add-outline'
                                style= {{height:25, with:25}}
                                fill= '#00e096'
                            />
                            <Text style={{textAlign:'center', fontWeight:'bold'}}>{jumlahsantri.length}</Text>
                            <Text style={{textAlign:'center'}} status='success'> Jumlah Santri </Text>
                        </View>
                        
                    </View>
                </Card>
            </View>

            <View style={{marginHorizontal:5, marginBottom:2}}>
                
                {prestasi.length > 0 ? (
                    <Card style={{marginBottom:2}} header={Header} >
                        {prestasi.map((value) => {
                            return (
                                <View style={{flexDirection:'row', paddingBottom:5}}>
                                    <Icon   
                                        name='checkmark'
                                        fill='grey'
                                        style={{height:20, width:15}}
                                    />
                                    <Text style={{color: 'grey'}}>{value.nama_prestasi}</Text>
                                </View>
                            )
                        })}
                    </Card>
                ):null}
                {programunggulan.length > 0 ? (
                    <Card header={HeaderProgram}>
                        {programunggulan.map((val) => {
                            return (
                                <View style={{flexDirection:'row', paddingBottom:5}}>
                                    <Icon   
                                        name='checkmark'
                                        fill='grey'
                                        style={{height:20, width:15}}
                                    />
                                    <Text style={{color: 'grey'}}>{val.nama_program}</Text>
                                </View>
                            )
                        })}
                    </Card>
                ):null}
            </View>
            {galeri.length > 0 ? (
            <>
            <View style={{marginBottom:2, marginHorizontal:5}}>
                <Card>
                    <Text status='success' style={{fontWeight:'bold'}} >Galeri {data.nama}</Text>
                </Card>
            </View>
            <FlatList
                data={galeri}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item})=>{
                    return (
                        <View style={{padding:2, backgroundColor:'white', marginHorizontal:5, borderRadius:4, marginBottom:5}}>
                                <TouchableOpacity onPress={() => {
                                        setVisible(true); 
                                        setGambarmodal(item.gambar);
                                    }}>
                                    <Image
                                        style={{height:150, width:300, borderRadius:5, padding:5}}
                                        source={{uri : `${GAMBAR}/file_mitra_galeri/thumbnail/${item.gambar}`}}
                                    />
                                </TouchableOpacity>
                                <Text style={{padding:5, color:'grey'}}>{item.keterangan}</Text>
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
                            style={{width:300, height:250, borderRadius:5}}
                            source={{ uri: `${GAMBAR}/file_mitra_galeri/${gambarmodal}`}}
                        />
                    </View>
            </Modal>
        </ScrollView>
        
    ):(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
            <Spinner status='success'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      minHeight: 192,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  });

export default App;