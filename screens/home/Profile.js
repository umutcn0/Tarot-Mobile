import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { signOutAsync } from '../../database/redux/slices/userAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../common/Loading';
import { getUserAsync } from '../../database/redux/slices/userSlice';
import ScreenWrapper from '../../components/ScreenWrapper';


const Profile = ({navigation}) => {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const userUid = useSelector((state) => state.userAuth.user.uid);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await dispatch(getUserAsync(userUid));
    }

    if (user === null) {
      fetchUserDetails();
    }
  }, []);

  const handleLogout = () => {
    try {
      dispatch(signOutAsync());
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <ScreenWrapper navigation={navigation} pageName="Profile">
      {isLoading && <Loading/>}
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Profile Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.avatarContainer}>
              <Ionicons name="planet" size={80} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.name}>{user?.displayName || "Unknown"}</Text>
            <Text style={styles.email}>{user?.email || "Unknown"}</Text>
          </View>

          {/* Profile Options */}
          <View style={styles.formContent}>
            <TouchableOpacity style={styles.option}
              onPress={() => navigation.navigate('ProfileSettings')}
            >
              <Ionicons name="person-outline" size={24} color="#fff" />
              <Text style={styles.optionText}>Profilim</Text>
              <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}
              onPress={() => navigation.navigate('AppSettings')}
            >
              <Ionicons name="settings-outline" size={24} color="#fff" />
              <Text style={styles.optionText}>Genel Ayarlar</Text>
              <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}
              onPress={() => navigation.navigate('Support')}
            >
              <Ionicons name="help-circle-outline" size={24} color="#fff" />
              <Text style={styles.optionText}>Destek</Text>
              <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Çıkış</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(244, 114, 182, 0.7)',
    borderRadius: 15,
    padding: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: 'rgba(244, 114, 182, 0.7)',
  },
  formContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: 'rgba(244, 114, 182, 0.2)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(244, 114, 182, 0.4)',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Profile