import Engine2d from "../engine2d"
import EngineInfo from "../../types/engine-info"
import {Planet, SpaceConf} from "./types"
import defParams from "./def-params"
import Color from "./color"
import engineParams from "../../types/engine-params"
import paramsList from "./params-list"

export default class SpaceGravityEngine extends Engine2d {

    getParamsList(): engineParams[] {
        return [defParams, ...paramsList]
    }

    planets: Planet[] = []

    conf: SpaceConf



    getInfo(): EngineInfo {
        return {
            id: "gravity",
            name: "Space Gravity Simulator",
            version: 1,
            description: "Show, how gravity works in 2d space"
        }
    }

    draw(): void {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.strokeStyle = "gray"
        this.ctx.setLineDash([5, 10])
        this.ctx.lineWidth = 1
        this.ctx.strokeRect(this.camera.x, this.camera.y, this.params!.size.x, this.params!.size.y)

        const twoPi = 2 * Math.PI
        this.planets.forEach(planet => {
            this.ctx.fillStyle = planet.color.getRGB()
            this.ctx.beginPath()
            this.ctx.arc(planet.position.x+this.camera.x, planet.position.y+this.camera.y, planet.radius, 0, twoPi)
            this.ctx.fill()
        })
    }

    nextStep(): void {
        const cnt = this.planets.length
        for (let i=0; i<cnt; i++) {
            const planet = this.planets[i]
            if (!planet.exists) continue
            for (let j=0; j<cnt; j++) {
                if (i==j) continue
                const other = this.planets[j]
                if (!other.exists) continue
                const dx = other.position.x - planet.position.x
                const dy = other.position.y - planet.position.y
                const dist = Math.sqrt(dx*dx+dy*dy)

                const touchDist = planet.radius + other.radius
                let fx = 0
                let fy = 0
                let force = 1

                if (dist <= touchDist) {
                    // Objects touch each other
                    planet.velocity.x = (planet.velocity.x * planet.mass + other.velocity.x * other.mass) / (planet.mass + other.mass)
                    planet.velocity.y = (planet.velocity.y * planet.mass + other.velocity.y * other.mass) / (planet.mass + other.mass)
                    if (dist <= this.conf.glueDistance) {
                        planet.color.glue(other.color, planet.mass / (planet.mass + other.mass))
                        planet.mass += other.mass
                        planet.radius = this.calcRadius(planet.mass)
                        other.exists = false
                    }
                } else {
                    force = other.mass / (dist * dist) * this.conf.gravityConst
                    fx = force * dx / dist
                    fy = force * dy / dist
                    planet.velocity.x += fx
                    planet.velocity.y += fy
                }
            }
        }

        this.planets = this.planets.filter(planet => planet.exists)

        this.planets.forEach(planet => {
            planet.position.x += planet.velocity.x
            planet.position.y += planet.velocity.y
            if (planet.position.x<0) planet.position.x = this.params!.size.x!
            if (planet.position.y<0) planet.position.y = this.params!.size.y!
            if (planet.position.x>this.params!.size.x!) planet.position.x = 0
            if (planet.position.y>this.params!.size.y!) planet.position.y = 0
        })
    }

    calcRadius(mass: number): number {
        return Math.pow(mass, this.conf.densityConst)
    }

    reset(): void {
        this.planets = []
        if (!this.params) this.params = defParams
        const cnt = this.params.count!
        const maxX = this.params.size.x
        const maxY = this.params.size.y
        this.conf = this.params.conf as SpaceConf
        const maxMass = this.conf.maxMass
        for (let i=0; i<cnt; i++) {
            const mass = 1+Math.random() * maxMass
            this.planets.push({
                position: {
                    x: Math.random() * maxX,
                    y: Math.random() * maxY,
                },
                color:  new Color(Math.random()*200+55, Math.random()*200+55, Math.random()*200+55),
                velocity: {x: 0, y: 0},
                mass,
                radius: this.calcRadius(mass),
                exists: true
            })
        }


        //
    }



}