import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { signOutAsync } from "../../database/redux/slices/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../common/Loading";
import BottomNavigation from "../../components/BottomNavigation";
import { getUserAsync, userUpdateAsync } from "../../database/redux/slices/userSlice";
import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';
import ProfileEditModal from '../../components/ProfileEditModal';


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
  const user = useSelector((state) => state.userAuth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const response = await dispatch(getUserAsync(user.uid));
    setUserDetails(response.payload);
    setIsLoading(false);
  }

  const updateUserDetails = async (field, value) => {
    const response = await dispatch(userUpdateAsync({...userDetails, [field]: value }));
    fetchUserDetails();
    setIsModalVisible(false);
  }

  const handleLogout = () => {
    dispatch(signOutAsync());
  };

  const handleFieldUpdate = () => {
    setIsModalVisible(false);
  };

  const openModal = (field, currentValue) => {
    setActiveField(field);
    setEditValue(currentValue || '');
    setIsModalVisible(true);
  };

  const fieldConfigs = {
    displayName: {
      title: 'Update Name',
      type: 'text',
    },
    age: {
      title: 'Update Age',
      type: 'number',
    },
    maritalStatus: {
      title: 'Update Marital Status',
      type: 'select',
      options: ['Single', 'In a Relationship', 'Married', 'Divorced', 'Widowed'],
    },
    jobStatus: {
      title: 'Update Job Status',
      type: 'select',
      options: ['Employed', 'Unemployed', 'Student', 'Retired'],
    },
    education: {
      title: 'Update Education',
      type: 'select',
      options: ['High School', 'Bachelor', 'Master', 'PhD', 'Other'],
    },
  };

  const copyReferralCode = async () => {
    try {
      await Clipboard.setStringAsync(user.referralCode);
      Alert.alert('Success', 'Referral code copied to clipboard!');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy referral code');
    }
  };

  return (
    <LinearGradient
      colors={["#1e1b4b", "#4a044e", "#3b0764"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
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
              {userDetails?.displayName || "Unknown"}
            </Text>
            <Text style={styles.email}>
              {userDetails?.email || "Unknown"}
            </Text>
          </View>

          {/* Profile Sections - Only render when userDetails is available */}
          {userDetails && (
            <View style={styles.formContent}>
              <SettingsTouchableOpacity user={userDetails} openModal={openModal} field_name="displayName" field_title="Name" />
              <SettingsTouchableOpacity user={userDetails} openModal={openModal} field_name="age" field_title="Age" />
              <SettingsTouchableOpacity user={userDetails} openModal={openModal} field_name="maritalStatus" field_title="Marital Status" />
              <SettingsTouchableOpacity user={userDetails} openModal={openModal} field_name="jobStatus" field_title="Job Status" />
              <SettingsTouchableOpacity user={userDetails} openModal={openModal} field_name="education" field_title="Education" />
              
              {/* Update Password Section */}
              <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate("UpdatePassword")}
              >
                <Text style={styles.optionText}>Update Password</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color="rgba(255, 255, 255, 0.5)"
                />
              </TouchableOpacity>

              {/* Referral Code Section */}
              <TouchableOpacity style={styles.option} onPress={copyReferralCode}>
                <Text style={styles.optionText}>Referral Code: {userDetails.referralCode}</Text>
                <Ionicons name="copy-outline" size={24} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <ProfileEditModal 
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          activeField={activeField}
          fieldConfigs={fieldConfigs}
          editValue={editValue}
          setEditValue={setEditValue}
          onUpdate={updateUserDetails}
        />
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName={"Profile"} />
    </LinearGradient>
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
