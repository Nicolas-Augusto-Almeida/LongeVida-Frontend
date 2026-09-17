import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import AppButton from '../AppButton/AppButton';
import { colors } from '../../theme/colors';
import { fontSize, radius, spacing } from '../../theme/typography';

import { styles } from './ConfirmDialog.styles';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancelar',
  confirmColor = colors.destructive,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.dialog} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <View style={{ flex: 1 }}>
              <AppButton title={cancelLabel} variant="outlined" color={colors.mutedForeground} onPress={onCancel} />
            </View>
            <View style={{ flex: 1 }}>
              <AppButton title={confirmLabel} color={confirmColor} onPress={onConfirm} />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
