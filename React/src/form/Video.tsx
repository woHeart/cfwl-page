import useZodForm from "@/hooks/from";
import FormSection from "@/component/formsection/FormSection";
import FormItem from "@/component/formitem/FormItem";

import { postVideo } from "@/api/video";
import { VideoSchema, type VideoData, videoFields } from "@/types/form/video";

const Video: React.FC = () => {
    const { register, formSubmit, control } = useZodForm(VideoSchema);

    const sectionTitleMap = {
        baseFields: '基础信息',
    } as const;

    const apiSubmit = async (data: VideoData) => {
        await postVideo(data);
    };

    return (
        <form onSubmit={formSubmit(apiSubmit)}>
            {Object.entries(videoFields).map(([fieldKey, fields]) => (
                <FormSection
                    key={fieldKey}
                    title={sectionTitleMap[fieldKey as keyof typeof sectionTitleMap]}
                >
                    <FormItem fields={fields} register={register} control={control}/>
                </FormSection>
            ))}

            <button type="submit">提交</button>
        </form>
    );
}

export default Video;