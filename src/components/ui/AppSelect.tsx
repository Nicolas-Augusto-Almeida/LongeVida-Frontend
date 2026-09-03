import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fontSize, radius, touchTarget } from '../../theme/typography';

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

export default function AppSelect({ label, value, options, onChange, icon }: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.field}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selected?.label ?? 'não selecionado'}`}
      >
        {icon}
        <Text style={[styles.value, !selected && { color: colors.mutedForeground }]}>
          {selected ? selected.label : 'Selecione...'}
        </Text>
        <Feather name="chevron-down" size={22} color={colors.mutedForeground} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  accessibilityRole="button"
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                  {item.value === value && <Feather name="check" size={22} color={colors.primary} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  label: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: 6, fontWeight: '500' },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: touchTarget,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    gap: 8,
  },
  value: { flex: 1, fontSize: fontSize.base, color: colors.foreground },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.white, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, maxHeight: '60%', padding: 16 },
  sheetTitle: { fontSize: fontSize.md, fontWeight: '700', marginBottom: 12, color: colors.foreground },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: { fontSize: fontSize.base, color: colors.foreground },
});
