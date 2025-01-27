import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'


const HistoryItem = ({ historyItem, onPress, isCompleted }) => {
  const WrappedView = isCompleted ? TouchableOpacity : View;
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10B981'; // green
      case 'pending':
        return '#F59E0B'; // amber
      default:
        return '#6B7280'; // gray
    }
  };

  const formatDate = (utcDate) => {
    const date = new Date(utcDate);
    const timezoneOffset = date.getTimezoneOffset() / 60;
    date.setHours(date.getHours() - timezoneOffset);
    return date.toLocaleString('en-GB', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-');
  };

  return (
    <WrappedView 
      style={[
        styles.historyEntry,
        !isCompleted && styles.disabledEntry
      ]}
      onPress={isCompleted ? onPress : null}
    >
      <View style={styles.entryHeader}>
        <View style={styles.categoryContainer}>
          <Text style={styles.entryTitle}>{historyItem.category_title}</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(historyItem.status) }
          ]}>
            <Text style={styles.statusText}>{historyItem.status}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formatDate(historyItem.created_at)}</Text>
        </View>
      </View>
    </WrappedView>
  )
}

export default HistoryItem

const styles = StyleSheet.create({
  historyEntry: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  entryHeader: {
    gap: 8,
  },
  disabledEntry: {
    opacity: 0.5,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
})