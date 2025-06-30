import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function Terms() {
    return (
        <>
            <div className="grow-1 w-full relative p-12">
                <div className="container flex flex-col justify-stat items-center gap-4">
                    <p className="text-4xl font-bold">
                        REGULAMIN I POLITYKA PRYWATNOŚCI
                    </p>
                    <Separator />
                    <Accordion className="w-full" type="multiple">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>1. Bla bla bla</AccordionTrigger>
                            <AccordionContent>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Distinctio, deleniti impedit
                                incidunt molestias quos sed!
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>2. Bla bla bla</AccordionTrigger>
                            <AccordionContent>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Iste nihil veritatis
                                reprehenderit fugiat necessitatibus est incidunt
                                ipsam illum, quaerat, vel eos impedit id
                                corrupti sed sapiente ipsum in non? Repellat
                                suscipit ab magnam quae ullam fugiat quas,
                                veniam explicabo praesentium quo. Suscipit nulla
                                nobis ratione tenetur a aperiam voluptates
                                distinctio labore id, accusantium corporis
                                dolorem cupiditate. Dignissimos exercitationem
                                aut minus.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>3. Bla bla bla</AccordionTrigger>
                            <AccordionContent>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Distinctio, deleniti impedit
                                incidunt molestias quos sed!
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>4. Bla bla bla</AccordionTrigger>
                            <AccordionContent>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Iste nihil veritatis
                                reprehenderit fugiat necessitatibus est incidunt
                                ipsam illum, quaerat, vel eos impedit id
                                corrupti sed sapiente ipsum in non? Repellat
                                suscipit ab magnam quae ullam fugiat quas,
                                veniam explicabo praesentium quo. Suscipit nulla
                                nobis ratione tenetur a aperiam voluptates
                                distinctio labore id, accusantium corporis
                                dolorem cupiditate. Dignissimos exercitationem
                                aut minus.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    );
}
