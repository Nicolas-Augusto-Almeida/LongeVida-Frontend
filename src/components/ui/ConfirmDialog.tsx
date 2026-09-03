import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import AppButton from './AppButton';
import { colors } from '../../theme/colors';
import { fontSize, radius, spacing } from '../../theme/typography';

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

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  dialog: { width: '100%', backgroundColor: colors.white, borderRadius: radius.lg, padding: spacing.lg },
  title: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, marginBottom: 10 },
  message: { fontSize: fontSize.base, color: colors.mutedForeground, marginBottom: 20 },
  actions: { flexDirection: 'row', gap: 12 },
});
