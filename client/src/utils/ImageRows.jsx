import {Image, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";

export default function ImageRows() {
  return (
    <Table hideHeader>
      <TableHeader>
          <TableColumn>Image 1</TableColumn>
          <TableColumn>Image 2</TableColumn>
          <TableColumn>Image 3</TableColumn>
          <TableColumn>Image 4</TableColumn>
          <TableColumn>Image 5</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>
            <Image
              src="https://picsum.photos/300/500"
              alt="Image 1"
              width={300}
              height={500}
            />
          </TableCell>
          <TableCell>
            <Image
              src="https://picsum.photos/300/500"
              alt="Image 2"
              width={300}
              height={500}
            />
          </TableCell>
          <TableCell>
            <Image
              src="https://picsum.photos/300/500"
              alt="Image 3"
              width={300}
              height={500}
            />
          </TableCell>
          <TableCell>
            <Image
              src="https://picsum.photos/300/500"
              alt="Image 3"
              width={300}
              height={500}
            />
          </TableCell>
          <TableCell>
            <Image
              src="https://picsum.photos/300/500"
              alt="Image 3"
              width={300}
              height={500}
            />
          </TableCell>


        </TableRow>
      </TableBody>
    </Table>
  )
}
