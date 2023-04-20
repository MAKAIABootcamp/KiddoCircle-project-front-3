{/* <FormGroup>
                            <Label for="subcategory">Sub-Categoría</Label>
                            <Input
                                id="subcategory"
                                name="subcategory"
                                type="select"
                                innerRef={refSubcategory}
                                {...registerSubcategory}
                            >
                                {typeSelected === "ropa"
                                    ? subCategoryClothes.map((item, index) => (
                                          <option key={index}>{item}</option>
                                      ))
                                    : typeSelected === "juguetes"
                                    ? subCategoryToys.map((item, index) => (
                                          <option key={index}>{item}</option>
                                      ))
                                    : subCategoryItems.map((item, index) => (
                                          <option key={index}>{item}</option>
                                      ))}
                            </Input>
                        </FormGroup>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="gender">Genero</Label>
                                    <Input
                                        id="gender"
                                        name="gender"
                                        type="select"
                                        innerRef={refGender}
                                        {...registerGender}
                                    >
                                        {gender.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="ropa">
                                        {typeSelected === "ropa"
                                            ? "Talla"
                                            : "Edad"}
                                    </Label>
                                    <Input
                                        id="ropa"
                                        name="ropa"
                                        type="select"
                                        innerRef={refRopa}
                                        {...registerRopa}
                                    >
                                        {typeSelected === "ropa"
                                            ? sizes.map((item, index) => (
                                                  <option key={index}>
                                                      {item}
                                                  </option>
                                              ))
                                            : age.map((item, index) => (
                                                  <option key={index}>
                                                      {item}
                                                  </option>
                                              ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="state">Estado</Label>
                                    <Input
                                        id="state"
                                        name="state"
                                        type="select"
                                        innerRef={refState}
                                        {...registerState}
                                    >
                                        {state.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="photos">Fotos del producto</Label>
                            <Input
                                id="photos"
                                name="photos"
                                type="file"
                                innerRef={refPhoto}
                                {...registerPhoto}
                            />
                            {errors.photos ? (
                                <span>{errors.photos.message}</span>
                            ) : (
                                <></>
                            )}
                        </FormGroup>
                         <FormGroup tag="fieldset" className="custom-purple">
                            <Label for="radio1">
                                ¿Qué desea hacer con el producto?
                            </Label>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="radio1"
                                        value="donar"
                                        checked={selectedOption === "donar"}
                                        onChange={(e) =>
                                            setSelectedOption(e.target.value)
                                        }
                                    />{" "}
                                    Donar
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="radio1"
                                        value="vender"
                                        checked={selectedOption === "vender"}
                                        onChange={(e) =>
                                            setSelectedOption(e.target.value)
                                        }
                                    />{" "}
                                    Vender
                                </Label>
                            </FormGroup>
                        </FormGroup>
                         {selectedOption === "vender" ? (
                            <FormGroup>
                                <Label for="price">Precio</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="text"
                                    placeholder="$ 150.000"
                                    innerRef={refPrice}
                                    {...registerPrice}
                                />
                                {errors.price ? (
                                    <span>{errors.price.message}</span>
                                ) : (
                                    <></>
                                )}
                            </FormGroup>
                        ) : (
                            <></>
                        )} */}