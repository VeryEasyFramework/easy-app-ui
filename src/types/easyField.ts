export interface EasyFieldTypeMap {
   IDField: string;
   DataField: string;
   IntField: number;
   BigIntField: bigint;
   DecimalField: number;
   DateField: Date;
   TimeStampField: number;
   BooleanField: boolean;
   PasswordField: string;
   ChoicesField: string;
   MultiChoiceField: string[];
   TextField: string;
   EmailField: string;
   ImageField: string;
   JSONField: Record<string, any>;
   PhoneField: string;
   ConnectionField: string;
}

export  type EasyFieldType = keyof EasyFieldTypeMap;


/**
 * The choice definition for a field that's set to `ChoicesField` or `MultiChoiceField`.
 */
export interface Choice {
   key: string;
   label: string;
   color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'accent' | 'muted';
}

/**
 * The connected entity definition for a field that's set to `ConnectionField`.
 */

export interface FetchOptions {
   fetchEntity: string; // entity name
   thisIdKey: string; // local id key
   thisFieldKey: string; // local field key
   thatFieldKey: string; // foreign field key
}

/**
 * The field definition for a field in an entity.
 */
export interface EasyField {
   /**
    * The key of the field. This is how the field will be accessed in the entity.
    */
   key: string

   /**
    * The label of the field. This is how the field will be displayed in the UI.
    */
   label?: string;

   /**
    * The description of the field. This is how the field will be described in the UI.
    */
   description?: string;

   /**
    * Whether the field is required.
    */
   required?: boolean;
   /**
    * Set to true if the field should be read-only and not editable by the user.
    */
   readOnly?: boolean;
   /**
    * The type of the field.
    *
    * **DataField**: Short text data. Limited to 255 characters.
    *
    * **IntField**: Integer.
    *
    * **BigIntField**: BigInt.
    *
    * **DecimalField**: Decimal.
    *
    * **DateField**: Date.
    *
    * **TimestampField**: Date and time.
    *
    * **BooleanField**: Boolean.
    *
    * **ChoicesField**: Single choice.
    *
    * **MultiChoiceField**: Multiple choices.
    *
    * **TextField**: Long text data.
    *
    * **EmailField**: Email.
    *
    * **ImageField**: Image URL.
    *
    * **JSONField**: JSON object.
    *
    * **PhoneField**: Phone number.
    *
    * **ConnectionField**: Connection to another entity.
    *
    * **PasswordField**: Password.
    *
    * **IDField**: ID.
    */
   fieldType: EasyFieldType

   fetchOptions?: FetchOptions;

   /**
    * Set to true if the field should be included in the default list view.
    */
   inList?: boolean;

   /**
    * The choices for the field. Only applicable for ChoicesField and MultiChoiceField.
    */
   choices?: Choice[];

   /**
    * The default value of the field. Can be a value or a function that returns a value.
    */
   defaultValue?: EasyFieldTypeMap[EasyFieldType]

   connectionEntity?: string;

   connectionTitleField?: string;

   /**
    * Set to true if the field should be unique.
    */
   unique?: boolean;

   group?: string;

   hidden?: boolean;
}
