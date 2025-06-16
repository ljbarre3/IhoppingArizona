export type ReviewPayload = {
    locationRating: number;
    atmosphereRating: number;
    qualityRating: number;
    costRating: number;
    serviceRating: number;
    notesHtml: string;
    imageFile?: File;
}