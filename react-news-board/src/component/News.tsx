import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NewsApiRepository from 'repository/NewsApi.repository';
import { Source } from "../model/NewsApi.model";
import VirtualTab from "../common/VirtualTab";
import TabArticles from "./TabArticles";

const News: React.FC = (params: PropsWithChildren<{}>) => {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ sources, setSources ] = useState<Source[]>([]);
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (values: any) => {};

    useEffect(() => {
        setLoading(true);
        NewsApiRepository.getSources()
            .then(response => {
                const { sources } = response.data;
                setSources(sources);
                setLoading(false);
            })
    }, []);

    return (
        <>
            <header>

            </header>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='date'
                        name="from"
                        ref={register({
                            required: 'Required'
                        })}
                    />
                    {/*{errors.from && errors.from.message}*/}

                    <input
                        type='date'
                        name="to"
                        ref={register({
                            required: 'Required'
                        })}
                    />
                    {/*{errors.to && errors.to.message}*/}
                    <input type="submit" value="submit"/>
                </form>
                <VirtualTab tabs={sources.map(source => ({
                    name: source.name,
                    component: <TabArticles source={source} />
                }))}/>
            </div>
        </>
    );
};

export default News;
