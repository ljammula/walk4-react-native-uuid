import {validate} from '../validate';

describe('validate', () => {
  describe('Valid UUIDs', () => {
    it.each([
      ['v1', '6ba7b811-9dad-11d1-80b4-00c04fd430c8'],
      ['v2', '550e8400-e29b-21d4-a716-446655440000'],
      ['v3', '6ba7b810-9dad-31d1-80b4-00c04fd430c8'],
      ['v4', '550e8400-e29b-41d4-a716-446655440000'],
      ['v5', '886313e1-3b8a-5372-9b90-0c9aee199e5d'],
    ])('should validate %s UUID', (_version, uuid) => {
      expect(validate(uuid)).toBe(true);
    });

    it('should validate NIL UUID', () => {
      expect(validate('00000000-0000-0000-0000-000000000000')).toBe(true);
    });

    it('should validate the lowercase UUIDv7 example', () => {
      expect(validate('017f22e2-79b0-7cc3-98c4-dc0c0c07398f')).toBe(true);
    });

    it('should validate the uppercase UUIDv7 example', () => {
      expect(validate('017F22E2-79B0-7CC3-98C4-DC0C0C07398F')).toBe(true);
    });

    it.each([
      '01234567-89ab-7cde-8f01-23456789abcd',
      '89ABCDEF-0123-7ABC-9DEF-0123456789AB',
      'aBcDeF01-2345-7AbC-aDeF-0123AbCdEf45',
      'FEDcBA98-7654-7fED-Ba98-9876FeDcBa10',
    ])('should validate canonical UUIDv7 values: %s', (uuid) => {
      expect(validate(uuid)).toBe(true);
    });

    it('should validate uppercase UUID', () => {
      expect(validate('550E8400-E29B-41D4-A716-446655440000')).toBe(true);
    });

    it('should validate mixed case UUID', () => {
      expect(validate('550e8400-E29b-41D4-a716-446655440000')).toBe(true);
    });

    it('should validate all lowercase UUID', () => {
      expect(validate('6ba7b811-9dad-11d1-80b4-00c04fd430c8')).toBe(true);
    });
  });

  describe('Invalid UUIDs', () => {
    it.each(['0', '6', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'])(
      'should reject UUID with unsupported version nibble %s',
      (version) => {
        expect(
          validate(`01234567-89ab-${version}cde-8f01-23456789abcd`),
        ).toBe(false);
      },
    );

    it.each(['0', '1', '2', '3', '4', '5', '6', '7', 'c', 'd', 'e', 'f'])(
      'should reject UUIDv7 with unsupported variant nibble %s',
      (variant) => {
        expect(
          validate(`01234567-89ab-7cde-${variant}f01-23456789abcd`),
        ).toBe(false);
      },
    );

    it('should reject UUID with invalid characters', () => {
      expect(validate('550e8400-e29b-41d4-a716-44665544000z')).toBe(false);
    });

    it('should reject UUID without hyphens', () => {
      expect(validate('550e8400e29b41d4a716446655440000')).toBe(false);
    });

    it('should reject UUID with misplaced hyphens', () => {
      expect(validate('550e8400-e29b-41d4-a716446655440000')).toBe(false);
    });

    it('should reject UUID with incorrect number of segments', () => {
      expect(validate('550e8400-e29b-41d4-a716')).toBe(false);
    });

    it('should reject UUID with incorrect segment lengths', () => {
      expect(validate('550e840-e29b-41d4-a716-446655440000')).toBe(false);
    });

    it('should reject UUID with wrong version bits', () => {
      expect(validate('550e8400-e29b-61d4-a716-446655440000')).toBe(false);
    });

    it('should reject UUID with wrong variant bits', () => {
      expect(validate('550e8400-e29b-41d4-3716-446655440000')).toBe(false);
    });

    it('should reject empty string', () => {
      expect(validate('')).toBe(false);
    });

    it('should reject null as string', () => {
      expect(validate(null as any)).toBe(false);
    });

    it('should reject undefined as string', () => {
      expect(validate(undefined as any)).toBe(false);
    });

    it('should reject number', () => {
      expect(validate(123 as any)).toBe(false);
    });

    it('should reject object', () => {
      expect(validate({} as any)).toBe(false);
    });

    it('should reject array', () => {
      expect(validate([] as any)).toBe(false);
    });

    it('should reject string with extra spaces', () => {
      expect(validate('550e8400-e29b-41d4-a716-446655440000 ')).toBe(false);
    });

    it('should reject string with leading spaces', () => {
      expect(validate(' 550e8400-e29b-41d4-a716-446655440000')).toBe(false);
    });

    it('should reject string with internal spaces', () => {
      expect(validate('550e8400-e29b-41d4-a716-44665544 000')).toBe(false);
    });
  });
});
