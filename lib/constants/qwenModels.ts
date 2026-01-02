export type QwenModelId =
  | 'qwen-max'
  | 'qwen-plus'
  | 'qwen-flash'
  | 'qwen-coder';

export interface QwenModelDefinition {
  id: QwenModelId;
  /** User facing display name */
  name: string;
  /** Longer description shown in pickers */
  description?: string;
  /** Whether the model accepts image input */
  supportsImages?: boolean;
  /** Alias strings that should resolve to this model */
  aliases: string[];
}

export const QWEN_MODEL_DEFINITIONS: QwenModelDefinition[] = [
  {
    id: 'qwen-max',
    name: 'Qwen Max',
    description: 'The most powerful model, ideal for complex tasks.',
    aliases: [
      'qwen-max',
      'qwenmax',
    ],
  },
  {
    id: 'qwen-plus',
    name: 'Qwen Plus',
    description: 'A balance of performance, speed, and cost.',
    aliases: [
      'qwen-plus',
      'qwenplus',
    ],
  },
  {
    id: 'qwen-flash',
    name: 'Qwen Flash',
    description: 'Fast and low-cost, ideal for simple jobs.',
    aliases: [
      'qwen-flash',
      'qwenflash',
    ],
  },
  {
    id: 'qwen-coder',
    name: 'Qwen Coder',
    description: 'An excellent code model that excels at tool calling and environment interaction.',
    aliases: [
      'qwen-coder',
      'qwencoder',
      'qwen',
    ],
  },
];

export const QWEN_DEFAULT_MODEL: QwenModelId = 'qwen-plus';

const QWEN_MODEL_ALIAS_MAP: Record<string, QwenModelId> = QWEN_MODEL_DEFINITIONS.reduce(
  (map, definition) => {
    definition.aliases.forEach((alias) => {
      const key = alias.trim().toLowerCase().replace(/[\s_]+/g, '-');
      map[key] = definition.id;
    });
    map[definition.id.toLowerCase()] = definition.id;
    return map;
  },
  {} as Record<string, QwenModelId>,
);

export function normalizeQwenModelId(model?: string | null): QwenModelId {
  if (!model) {
    return QWEN_DEFAULT_MODEL;
  }
  const normalized = model.trim().toLowerCase().replace(/[\s_]+/g, '-');
  return QWEN_MODEL_ALIAS_MAP[normalized] ?? QWEN_DEFAULT_MODEL;
}

export function getQwenModelDefinition(id: string): QwenModelDefinition | undefined {
  return (
    QWEN_MODEL_DEFINITIONS.find((definition) => definition.id === id) ??
    QWEN_MODEL_DEFINITIONS.find((definition) =>
      definition.aliases.some((alias) => alias.toLowerCase() === id.toLowerCase()),
    )
  );
}

export function getQwenModelDisplayName(id?: string | null): string {
  if (!id) {
    return getQwenModelDefinition(QWEN_DEFAULT_MODEL)?.name ?? QWEN_DEFAULT_MODEL;
  }
  const normalized = normalizeQwenModelId(id);
  return getQwenModelDefinition(normalized)?.name ?? normalized;
}
