import {IsArray, IsNotEmpty} from 'class-validator';

export class ExampleRequest {
    @IsArray()
    @IsNotEmpty({each: true})
    option1: string[] = [];
)
    @IsArray()
    @IsNotEmpty({each: true})
    option2: string[] = [];

    @IsArray()
    @IsNotEmpty({each: true})
    option3: string[] = [];
}
