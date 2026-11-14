
export interface DataType<T>{
    ok: boolean;
    data: {
        items: T
    };
};