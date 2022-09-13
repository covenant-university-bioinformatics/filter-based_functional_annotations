import * as mongoose from 'mongoose';

export enum AnnotationType {
  GWAVA = "GWAVA",
  DANN = "DANN",
  GERP = "GERP",
  EIGEN = "EIGEN"
}

//Interface that describe the properties that are required to create a new job
interface FilterAnnotAttrs {
  job: string;
  useTest: string;
  marker_name: string;
  chromosome: string;
  position: string;
  effect_allele: string;
  alternate_allele: string;
  annotation_type: AnnotationType;
}

// An interface that describes the extra properties that a model has
//collection level methods
interface FilterAnnotModel extends mongoose.Model<FilterAnnotDoc> {
  build(attrs: FilterAnnotAttrs): FilterAnnotDoc;
}

//An interface that describes a properties that a document has
export interface FilterAnnotDoc extends mongoose.Document {
  id: string;
  version: number;
  useTest: boolean;
  marker_name: number;
  chromosome: number;
  position: number;
  effect_allele: number;
  alternate_allele: number;
  annotation_type: AnnotationType;
}

const FilterAnnotSchema = new mongoose.Schema<FilterAnnotDoc, FilterAnnotModel>(
  {
    useTest: {
      type: Boolean,
      trim: true,
    },
    marker_name: {
      type: Number,
      trim: true,
    },
    chromosome: {
      type: Number,
      trim: true,
    },
    position: {
      type: Number,
      trim: true,
    },
    effect_allele: {
      type: Number,
      trim: true,
    },
    alternate_allele: {
      type: Number,
      trim: true,
    },
    annotation_type: {
      type: String,
      enum: [...Object.values(AnnotationType)],
      trim: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FilterAnnotJob',
      required: true,
    },
    version: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: 'version',
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        // delete ret._id;
        // delete ret.__v;
      },
    },
  },
);

//increments version when document updates
FilterAnnotSchema.set('versionKey', 'version');

//collection level methods
FilterAnnotSchema.statics.build = (attrs: FilterAnnotAttrs) => {
  return new FilterAnnotModel(attrs);
};

//create mongoose model
const FilterAnnotModel = mongoose.model<FilterAnnotDoc, FilterAnnotModel>(
  'FilterAnnot',
  FilterAnnotSchema,
  'filterannot',
);

export { FilterAnnotModel };
