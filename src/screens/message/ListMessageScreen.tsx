import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import ListMessageItem, { GroupChatType } from '../../component/message/ListMessageItem'
import { useMyContext } from '../../component/navigation/UserContext'
import { getGroupsAPI } from '../../http/ChienHTTP'
import { socket } from '../../http/SocketHandle'
const ListMessageScreen = () => {
  const {user}=useMyContext()
  const [groups,setGroups]=useState<Array<GroupChatType>>([])

  useEffect(()=>{
    getGroups()
    socket.on(`message-${user?.id}`, (message) => {
      console.log('message'+user.id,message);
      getGroups()
    })
  },[])

  async function getGroups(){
    const respone= await getGroupsAPI()
    if(respone){
      setGroups(respone)
    } 
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Nhắn tin</Text>
        <TouchableOpacity>
          <EntypoIcon name='new-message' size={24} color={'#000'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
          <FlatList
            data={groups}
            renderItem={({item})=>{
              return (
                <ListMessageItem group={item}/>
              )
            }}
            keyExtractor={(item)=>item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
      </View>
    </View>
  )
}

export default ListMessageScreen

const styles = StyleSheet.create({
  content:{
    marginTop:20
  },
  header:{
    color:'#000',
    fontSize:30,
    fontWeight:'700'
  },  
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  container:{
    paddingHorizontal:24,
    paddingVertical:8
  },
})