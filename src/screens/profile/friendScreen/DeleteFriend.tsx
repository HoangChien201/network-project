import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { deleteFriend } from '../../../http/QuyetHTTP';
import { useSelector } from 'react-redux';
import { RootState } from '../../../component/store/store';
type Mo = {
  show: boolean;
  setShow: (value: any) => void;
  user2: number;
  setFriends: (value:any) => void;
  name:any,
  setDeleted:(value:any) =>void
}
const DeleteFriend: React.FC<Mo> = ({ show, setShow, user2 ,setFriends,name,setDeleted}) => {
  const user = useSelector((state : RootState)=>state.user.value)
  const deleteF = async (id: number) => {
    const user1 = Number(user?.id);
    const user2 = Number(id);
    try {
      const result = await deleteFriend(user1, user2);
      if(result){
        setShow(false);
        setFriends((prevFriends) => prevFriends.filter(friend => friend.user.id !== user2));
        setDeleted(pre =>!pre);
      }
      
      
    } catch (error) {
      console.log('Lỗi khi xóa bạn: ', error);
    }
  };

  return (
    <Modal
      visible={show}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShow(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Xác nhận</Text>
          <Text style={styles.message}>Xóa bạn bè với {name}?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setShow(false)}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => deleteF(user2)}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DeleteFriend

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})