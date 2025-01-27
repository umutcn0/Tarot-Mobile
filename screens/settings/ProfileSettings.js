import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../common/Loading";
import { getUserAsync, userUpdateAsync } from "../../database/redux/slices/userSlice";
import * as Clipboard from 'expo-clipboard';
import EditModal from '../../components/EditModal';
import useAlert from '../../hooks/useAlert';
import ScreenWrapper from "../../components/ScreenWrapper";
import { profileSettingsFields } from "../../constants/ComponentConfigs";


const SettingsTouchableOpacity = ({user, openModal, field_name, field_title}) => {
  if (!user) return null;
  
  return (
    <TouchableOpacity style={styles.option}
      onPress={() => openModal(field_name, user[field_name])}
    >
      <Text style={styles.optionText}>{field_title}: {user[field_name] || "Not set"}</Text>
      <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.5)" />
    </TouchableOpacity>
  )
}

const ProfileSettings = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const userUid = useSelector((state) => state.userAuth.user.uid);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const alert = useAlert();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      await dispatch(getUserAsync(userUid));
    }

    if (user === null) {
      fetchUserDetails();
    }
  }, []);

  const updateUser = async (field, value) => {
    await dispatch(userUpdateAsync({...user, [field]: value }));
    setIsModalVisible(false);
  }

  const openModal = (field, currentValue) => {
    setActiveField(field);
    setEditValue(currentValue || '');
    setIsModalVisible(true);
  };

  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setStringAsync(text);
      alert('Başarılı', 'Referans kodu panoya kopyalandı!');
    } catch (error) {
      alert('Hata', 'Referans kodu kopyalanamadı');
    }
  };

  return (
    <ScreenWrapper navigation={navigation} pageName="ProfileSettings">
      <SafeAreaView style={styles.container}>
        {isLoading && <Loading />}
        <ScrollView style={styles.scrollView}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Profile Header */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {user?.displayName || "Unknown"}
            </Text>
            <Text style={styles.email}>
              {user?.email || "Unknown"}
            </Text>
          </View>

          {/* Profile Sections - Only render when user is available */}
          {user && (
            <View style={styles.formContent}>
              <SettingsTouchableOpacity user={user} openModal={openModal} field_name="displayName" field_title="İsim" />
              <SettingsTouchableOpacity user={user} openModal={openModal} field_name="age" field_title="Yaş" />
              <SettingsTouchableOpacity user={user} openModal={openModal} field_name="maritalStatus" field_title="Medeni Durum" />
              <SettingsTouchableOpacity user={user} openModal={openModal} field_name="jobStatus" field_title="İş Durum" />
              <SettingsTouchableOpacity user={user} openModal={openModal} field_name="education" field_title="Eğitim Durum" />
              
              {/* Update Password Section 
              <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate("UpdatePassword")}
              >
                <Text style={styles.optionText}>Şifreni Güncelle</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="rgba(255, 255, 255, 0.5)"
                />
              </TouchableOpacity>
              */}
              {/* Referral Code Section */}
              <TouchableOpacity style={styles.option} onPress={() => copyToClipboard(user.referralCode)}>
                <Text style={styles.optionText}>Referans Kodu: {user.referralCode}</Text>
                <Ionicons name="copy-outline" size={24} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <EditModal 
          isVisible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          activeField={activeField}
          fieldConfigs={profileSettingsFields}
          editValue={editValue}
          setEditValue={setEditValue}
          onUpdate={updateUser}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    padding: 20,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "rgba(244, 114, 182, 0.7)",
  },
  formContent: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 24,
  },
  option: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "rgba(244, 114, 182, 0.2)",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(244, 114, 182, 0.4)",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    position: 'absolute',
    top: -5,
    left: 0,
    zIndex: 1,
    padding: 8,
  },
});

export default ProfileSettings;
