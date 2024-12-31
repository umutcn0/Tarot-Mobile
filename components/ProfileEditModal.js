import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ProfileEditModal = ({ 
  isVisible, 
  onClose, 
  activeField, 
  fieldConfigs, 
  editValue, 
  setEditValue, 
  onUpdate 
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalContainer} 
        activeOpacity={1} 
        onPress={onClose}
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
              {activeField && fieldConfigs[activeField]?.title}
            </Text>

            {activeField && fieldConfigs[activeField]?.type === 'select' ? (
              <ScrollView style={styles.optionsContainer}>
                {fieldConfigs[activeField].options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.option}
                    onPress={() => onUpdate(activeField, option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={editValue}
                  onChangeText={setEditValue}
                  placeholder={`Enter your ${activeField}`}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  keyboardType={fieldConfigs[activeField]?.type === 'number' ? 'numeric' : 'default'}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => onUpdate(activeField, editValue)}
                >
                  <Text style={styles.closeButtonText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    maxHeight: 200,
    width: "100%",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 10,
  },
  option: {
    padding: 10,
    marginHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 18,
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    color: "#fff",
    width: "100%",
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
});

export default ProfileEditModal; 