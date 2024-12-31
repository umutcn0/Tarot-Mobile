import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import TopProfileBar from "../common/TopProfileBar";
import BottomNavigation from "../../components/BottomNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync, userUpdateAsync } from "../../database/redux/slices/userSlice";
import { Ionicons } from "@expo/vector-icons";

const AppSettings = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.user);
  const [userDetails, setUserDetails] = useState(null);
  const [language, setLanguage] = useState("Turkish");
  const [currency, setCurrency] = useState("TRY");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null); // To track which setting is being edited

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const response = await dispatch(getUserAsync(user.uid));
    const details = response.payload;
    setUserDetails(details);
    setLanguage(details.language || "Türkçe");
    setCurrency(details.currency || "TRY");
  };

  const handleSaveSettings = async () => {
    try {
      await dispatch(userUpdateAsync({
        ...userDetails,
        language,
        currency
      }));
      // Refresh user details
      await fetchUserDetails();
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating settings:", error);
      // Optionally add error handling UI here
    }
  };

  const openModal = (setting) => {
    setSelectedSetting(setting);
    setModalVisible(true);
  };

  const handleOptionSelect = (itemValue) => {
    if (selectedSetting === "language") {
      setLanguage(itemValue);
      handleSaveSettings();
    } else if (selectedSetting === "currency") {
      setCurrency(itemValue);
      handleSaveSettings();
    }
    setModalVisible(false); // Close modal after selection
  };

  return (
    <LinearGradient
      colors={["#1e1b4b", "#4a044e", "#3b0764"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Ayarlar</Text>

          <View style={styles.formContent}>
            <View style={styles.settingOptionContainer}>
              <Text style={styles.label}>Dil:</Text>
              <TouchableOpacity
                style={styles.settingOption}
                onPress={() => openModal("language")}
              >
                <Text style={styles.label}>{language}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.settingOptionContainer}>
              <Text style={styles.label}>Para Birimi:</Text>
              <TouchableOpacity
                style={styles.settingOption}
                onPress={() => openModal("currency")}
              >
                <Text style={styles.label}>{currency}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName="AppSettings" />

      {/* Custom Modal for Picker */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <LinearGradient
              colors={["#1e1b4b", "#4a044e"]}
              style={styles.modalContent}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.modalTitle}>
                Select {selectedSetting === "language" ? "Language" : "Currency"}
              </Text>
              <ScrollView style={styles.optionsContainer}>
                {selectedSetting === "language" ? (
                  <>
                    <TouchableOpacity
                      onPress={() => handleOptionSelect("Türkçe")}
                      style={styles.option}
                    >
                      <Text style={styles.optionText}>Türkçe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleOptionSelect("English")}
                      style={styles.option}
                    >
                      <Text style={styles.optionText}>English</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => handleOptionSelect("USD")}
                      style={styles.option}
                    >
                      <Text style={styles.optionText}>USD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleOptionSelect("EUR")}
                      style={styles.option}
                    >
                      <Text style={styles.optionText}>EUR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleOptionSelect("TRY")}
                      style={styles.option}
                    >
                      <Text style={styles.optionText}>TRY</Text>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  settingOption: {
    flex: 1,
    padding: 10,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    justifyContent: "center",
  },
  settingOptionContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    width: 90,
  },
  saveButton: {
    backgroundColor: "rgba(244, 114, 182, 0.7)",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  optionsContainer: {
    maxHeight: 200, // Limit the height of the options container
    width: "100%",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 10,
  },
  option: {
    padding: 10,
    marginHorizontal: 25,
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 18,
    color: "#fff",
  },
  closeButton: {
    width: "40%",
    marginTop: 20,
    backgroundColor: "rgba(244, 114, 182, 0.7)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  formContent: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: -5,
    left: 0,
    zIndex: 1,
    padding: 8,
  },
});

export default AppSettings;
